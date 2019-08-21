/**
 * Routes registry for TeqFW Web Server.
 */
export default class TeqFw_Core_App_Registry_Server_Route {
    constructor(spec) {
        /**
         * Definitions of virtual structures.
         *
         * @typedef {Object} TeqFw_Core_App_Registry_Server_Route.Entry
         * @property {string} path
         * @property {Function} handler
         */

        /**
         * Inner registry to save backend routes data.
         *
         * @type {Map<string, TeqFw_Core_App_Registry_Server_Route.Entry>}
         * @private
         */
        const _registry = new Map();

        /**
         * Add backend route to the registry.
         *
         * @param {TeqFw_Core_App_Registry_Server_Route.Entry} spec
         * @memberOf TeqFw_Core_App_Registry_Server_Route.prototype
         */
        this.add = function (spec) {
            const {path} = spec;
            _registry.set(path, spec);
        };

        /**
         * Get backend route data by name or get all backend routes.
         *
         * @param {string}[path] - Path to get route data from registry. Get all entries for all routes if undefined.
         * @return {Map<string, TeqFw_Core_App_Registry_Server_Route.Entry>|TeqFw_Core_App_Registry_Server_Route.Entry}
         * @memberOf TeqFw_Core_App_Registry_Server_Route.prototype
         */
        this.get = function (path = undefined) {
            let result;
            if (path) {
                result = _registry.get(path);
            } else {
                result = _registry;
            }
            return result;
        };
    }
}