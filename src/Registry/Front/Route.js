"use strict";


/**
 * Frontend routes registry.
 *
 * @return {TeqFw_Core_App_Registry_Front_Route}
 * @constructor
 */
function TeqFw_Core_App_Registry_Front_Route() {
    /**
     * Structure of the registry entry.
     *
     * @typedef {Object} TeqFw_Core_App_Registry_Front_Route.Entry
     * @property {string} path
     * @property {string} component_name
     * @property {string} label
     */

    /**
     * Inner registry to save frontend routes data.
     *
     * @type {Map<string, TeqFw_Core_App_Registry_Front_Route.Entry>}
     * @private
     */
    const _registry = new Map();

    /**
     * Save frontend route data into the registry.
     *
     * @param {TeqFw_Core_App_Registry_Front_Route.Entry} spec - Frontend route definition.
     */
    this.add = function (spec) {
        const {path} = spec;
        _registry.set(path, spec);
    };

    /**
     * Get frontend route data by name or get all frontend routes.
     *
     * @param path
     * @return {Map<string, TeqFw_Core_App_Registry_Front_Route.Entry>|TeqFw_Core_App_Registry_Front_Route.Entry}
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

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Registry_Front_Route;