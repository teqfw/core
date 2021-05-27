/**
 * Connector to IndexedDb to use with async/await in TeqFW apps.
 */
const NS = 'TeqFw_Core_App_Front_Idb_Connect';

class TeqFw_Core_App_Front_Idb_Connect {
    constructor() {
        let /** @type {function} */
            fnUpgrade,
            /** @type {IDBDatabase} */
            db;

        // DEFINE INSTANCE METHODS

        this.openDb = function (name, version, _fnUpgrade) {
            fnUpgrade = _fnUpgrade;
            return new Promise(function (resolve, reject) {
                const openRequest = indexedDB.open(name, version);
                if (typeof fnUpgrade === 'function') openRequest.onupgradeneeded = fnUpgrade;
                openRequest.onerror = () => reject(openRequest.error);
                openRequest.onsuccess = () => (db = openRequest.result) && resolve(db);
            });
        }

        this.isConnected = function () {
            return db !== undefined;
        }

        this.trans = function (stores, mode = null, options = null) {
            if (!db) throw new Error("Please, connect to DB first.");
            return new Transaction(db.transaction(stores, mode, options));
        }
    }

}

/**
 * Wrapper for IDBObjectStore.
 *
 * @memberOf TeqFw_Core_App_Front_Idb_Connect
 */
class Store {
    constructor(_store) {
        const store = _store;

        this.getByKey = function (key) {
            return new Promise(function (resolve, reject) {
                const request = store.get(key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        }

        this.put = function (value, key) {
            return new Promise(function (resolve, reject) {
                const request = store.put(value, key);
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        }
    }
}

Object.defineProperty(Store, 'name', {value: `${NS}.${Store.name}`});

/**
 * Wrapper for IDBTransaction.
 *
 * @memberOf TeqFw_Core_App_Front_Idb_Connect
 */
class Transaction {
    constructor($tran) {
        const tran = $tran;

        /**
         * Return IDB store wrapper.
         *
         * @param storeName
         * @return {TeqFw_Core_App_Front_Idb_Connect.Store}
         */
        this.getStore = function (storeName) {
            return new Store(tran.objectStore(storeName));
        }
    }
}

Object.defineProperty(Transaction, 'name', {value: `${NS}.${Transaction.name}`});

export default TeqFw_Core_App_Front_Idb_Connect;
export {Store, Transaction}
