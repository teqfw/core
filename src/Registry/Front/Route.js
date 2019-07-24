"use strict";


/**
 * Frontend routes registry..
 *
 * @return {TeqFw_Core_App_Registry_Front_Route}
 * @constructor
 */
function TeqFw_Core_App_Registry_Front_Route() {
    /**
     * Structure of the registry entry.
     *
     * @typedef {Object} TeqFw_Core_App_Registry_Front_Route.Entry
     * @property {string} prop_str
     * @property {Object} prop_obj
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
        const {name} = spec;
        _registry.set(name, spec);
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Registry_Front_Route;