"use strict";

/**
 * Empty handler to map to any backend route.
 *
 * @param {TeqFw_Core_App_Registry_Front_Route} TeqFw_Core_App_Registry_Front_Route
 * @return {TeqFw_Core_App_Server_Route_Handler_Empty}
 * @constructor
 */
function TeqFw_Core_App_Server_Route_Handler_Empty(
    TeqFw_Core_App_Registry_Front_Route
) {

    /** @type {TeqFw_Core_App_Registry_Front_Route} */
    const _reg_front_routes = TeqFw_Core_App_Registry_Front_Route;

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
     */
    this.exec = function (req, res, next) {
        init_cfg();
        console.log("./config/get handler is here!!");
        res.json(_cached_cfg);
        // next();
    };


    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Server_Route_Handler_Empty;