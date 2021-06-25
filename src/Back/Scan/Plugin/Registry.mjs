/**
 * Registry to store data about TeqFW plugins.
 */
export default class TeqFw_Core_Back_Scan_Plugin_Registry {
    constructor() {
        /** @type {Object.<string, TeqFw_Core_Back_Scan_Plugin_Dto_Item>} */
        const store = {};

        /**
         * @param {String} packageName
         * @returns {TeqFw_Core_Back_Scan_Plugin_Dto_Item|null}
         */
        this.get = function (packageName) {
            return store[packageName] ?? null;
        };

        /**
         * @returns {TeqFw_Core_Back_Scan_Plugin_Dto_Item[]}
         */
        this.items = function () {
            return Object.values(store);
        };

        /**
         * @param {String} packageName
         * @param {TeqFw_Core_Back_Scan_Plugin_Dto_Item} item
         */
        this.set = function (packageName, item) {
            store[packageName] = item;
        };
    }
}
