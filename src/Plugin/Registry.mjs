/**
 * Registry to store data about TeqFW plugins.
 */
export default class TeqFw_Core_App_Plugin_Registry {
    constructor() {
        /** @type {Object.<string, TeqFw_Core_App_Plugin_Scan_Item>} */
        const store = {};

        /**
         * @param {String} packageName
         * @return {TeqFw_Core_App_Plugin_Scan_Item|null}
         */
        this.get = function (packageName) {
            return store[packageName] ?? null;
        };
        /**
         * @return {TeqFw_Core_App_Plugin_Scan_Item[]}
         */
        this.items = function () {
            return Object.values(store);
        };
        /**
         * @param {String} packageName
         * @param {TeqFw_Core_App_Plugin_Scan_Item} item
         */
        this.set = function (packageName, item) {
            store[packageName] = item;
        };
    }
}
