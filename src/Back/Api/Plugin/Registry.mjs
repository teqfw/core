/**
 * Registry to store data about TeqFW plugins.
 */
export default class TeqFw_Core_Back_Api_Plugin_Registry {
    constructor() {
        /** @type {Object.<string, TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item>} */
        const _store = {};
        /** @type {Object<number, string[]>} */
        let _storeByLevel = {};
        let _appName;
        /**
         * @param {string} packageName
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item|null}
         */
        this.get = function (packageName) {
            return _store[packageName] ?? null;
        };

        /**
         * Get root plugin name as application name.
         * @return {string}
         */
        this.getAppName = () => _appName;

        /**
         * Get plugin names ordered by weights (from base plugins to dependent).
         *
         * @return {Object<number, string[]>}
         */
        this.getLevels = function () {
            return _storeByLevel;
        }

        /**
         * Return plugin items ordered by hierarchy from down (base) to top
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]}
         */
        this.getItemsByLevels = function (downUp = true) {
            const res = [];
            const keys = Object.keys(_storeByLevel).map(key => parseInt(key)); // get keys as integers
            keys.sort((a, b) => a - b); // sort as numbers
            for (const key of keys)
                for (const name of _storeByLevel[key]) res.push(_store[name]);
            if (!downUp) res.reverse();
            return res;
        }
        /**
         * Get mapping for plugin's root paths to plugin names.
         * ('/home/prj/app/node_modules/@scope/plugin' => '@scope/plugin')
         * @return {Object<string, string>}
         */
        this.getMapPath2Name = function () {
            const res = {};
            for (const key of Object.keys(_store)) {
                /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item} */
                const item = _store[key];
                res[item.path] = item.name;
            }
            return res;
        }

        /**
         * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]}
         */
        this.items = function () {
            return Object.values(_store);
        };

        /**
         * @param {string} packageName
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item} item
         */
        this.set = function (packageName, item) {
            _store[packageName] = item;
        };

        /**
         * Set root plugin name as application name.
         * @param {string} name
         */
        this.setAppName = function (name) {
            _appName = name;
        };

        /**
         * @param {Object<number, string[]>} data
         */
        this.setLevels = function (data) {
            _storeByLevel = data;
        };

    }
}
