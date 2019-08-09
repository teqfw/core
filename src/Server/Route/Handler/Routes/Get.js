"use strict";

/**
 * Get all available backend routes.
 *
 * @param {TeqFw_Core_App_Registry_Server_Route} TeqFw_Core_App_Registry_Server_Route
 * @return {TeqFw_Core_App_Server_Route_Handler_Routes_Get}
 * @constructor
 */
function TeqFw_Core_App_Server_Route_Handler_Routes_Get(
    TeqFw_Core_App_Registry_Server_Route
) {

    /** @type {TeqFw_Core_App_Registry_Server_Route} */
    const _reg_routes = TeqFw_Core_App_Registry_Server_Route;

    /** @type {Object} */
    let _cached_cfg;

    function init_cfg() {
        if (_cached_cfg === undefined) {
            _cached_cfg = {};
            const routes = [];
            const all = _reg_routes.get();
            /** @type {TeqFw_Core_App_Registry_Server_Route.Entry[]} */
            const values = all.values();
            for (const one of values) {
                routes.push(one.path);
            }
            _cached_cfg.routes = routes;
        }
    }

    /**
     * Send JSON data to the web.
     */
    this.exec = function (req, res, next) {
        init_cfg();
        res.json(_cached_cfg.routes);
        // next();
    };


    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Server_Route_Handler_Routes_Get;