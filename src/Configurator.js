"use strict";

/**
 * Application level configuration.
 *
 * @return {TeqFw_Core_App_Configurator}
 * @constructor
 */
function TeqFw_Core_App_Configurator() {
    /**
     * Inner object to store configuration data.
     *
     * @type {Object}
     */
    let _store = {};

    /**
     * Save `cfg` object as initial configuration into inner store.
     *
     * @param {Object} cfg - Initial configuration to save to internal store.
     */
    this.init = (cfg) => {
        _store = cfg;
    };

    /**
     * Get configuration value by path (`path/to/the/node`).
     *
     * @param {string} cfg_path - Path to the node of the configuration tree (`path/to/the/node`).
     * @return {string|boolean|number|Object} - Configuration value.
     */
    this.get = (cfg_path) => {
        let result = _store;
        const parts = cfg_path.split("/");
        for (const one of parts) {
            if (one) {
                if (result[one]) {
                    result = result[one];
                } else {
                    result = undefined;
                    break;
                }
            }
        }
        return result;
    };

    /**
     * Set configuration value by path (`path/to/the/node`).
     *
     * @param {string} cfg_path - Path to the node of the configuration tree (`path/to/the/node`).
     * @param {string|boolean|number|Object} data - Value to save into configuration tree.
     */
    this.set = (cfg_path, data) => {
        const parts = cfg_path.split("/");
        let current = _store;
        let ndx = 1;
        for (const one of parts) {
            if (one) {
                if (!current[one]) {
                    current[one] = {};
                }
                if (ndx < parts.length) {
                    current = current[one];
                } else {
                    current[one] = data;
                }
            }
            ndx += 1;
        }
    };

    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Configurator;