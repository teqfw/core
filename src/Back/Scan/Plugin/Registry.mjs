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
        this.getLevels=function () {
            return storeByLevel;
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
