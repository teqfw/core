/**
 * Registry to store data about TeqFW plugins.
 */
export default class TeqFw_Core_Back_Scan_Plugin_Registry {
    constructor() {
        /** @type {Object.<string, TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item>} */
        const store = {};
        /** @type {Object<number, string[]>} */
        let storeByLevel = {};
        /**
         * @param {string} packageName
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item|null}
         */
        this.get = function (packageName) {
            return store[packageName] ?? null;
        };
        /**
         * Get plugin names ordered by weights (from base plugins to dependent).
         *
         * @return {Object<number, string[]>}
         */
        this.getLevels = function () {
            return storeByLevel;
        }

        /**
         * Return plugin items ordered by hierarchy from down (base) to top
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]}
         */
        this.getItemsByLevels = function (downUp = true) {
            const res = [];
            const keys = Object.keys(storeByLevel).map(key => parseInt(key)); // get keys as integers
            keys.sort((a, b) => a - b); // sort as numbers
            for (const key of keys)
                for (const name of storeByLevel[key]) res.push(store[name]);
            if (!downUp) res.reverse();
            return res;
        }

        /**
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]}
         */
        this.items = function () {
            return Object.values(store);
        };

        /**
         * @param {string} packageName
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item} item
         */
        this.set = function (packageName, item) {
            store[packageName] = item;
        };

        /**
         * @param {Object<number, string[]>} data
         */
        this.setLevels = function (data) {
            storeByLevel = data;
        };

    }
}
