/**
 * Get configuration from backend.
 */
export default class TeqFw_Core_App_Server_Route_Handler_Config_Get {
    constructor(spec) {
        /** @type {TeqFw_Core_App_Registry_Front_Route} */
        const _reg_front_routes = spec.TeqFw_Core_App_Registry_Front_Route;

        let _cached_cfg;

        function init_cfg() {
            if (_cached_cfg === undefined) {
                _cached_cfg = {};
                const routes = [];
                const all = _reg_front_routes.get();
                const values = all.values();
                /** @type {TeqFw_Core_App_Registry_Front_Route.Entry} */
                for (const one of values) {
                    routes.push(one);
                }
                _cached_cfg.routes = routes;
            }
        }

        /**
         * Send JSON data to the web.
         * @memberOf TeqFw_Core_App_Server_Route_Handler_Config_Get.prototype
         */
        this.exec = function (req, res, next) {
            init_cfg();
            res.json(_cached_cfg);
            // next();
        };
    }
}