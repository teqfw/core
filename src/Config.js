/**
 * Application configuration.
 *
 * @namespace TeqFw_Core_App_Config
 */
"use strict";
const fs = require("fs");

/**
 * Application configuration.
 *
 * @return {TeqFw_Core_App_Config}
 * @class
 */
function TeqFw_Core_App_Config() {
    /* Object properties (private) */
    let _store = {};

    /* Object properties (public) */

    /* Object methods (private) */

    /* Object methods (public) */

    /**
     * Save `cfg` object into private store as initial configuration.
     *
     * @param {Object} cfg
     * @param {string} path_local
     * @return {Promise<void>}
     */
    this.init = (cfg, path_local) => {
        return new Promise(function (resolve) {
            _store = cfg;
            fs.readFile(path_local, (err, raw_data) => {
                if (err) throw err;
                _store.local = JSON.parse(raw_data.toString());
                console.log(`Local configuration is read from '${path_local}'.`);
                resolve();
            });
        });
    };

    /**
     * Get configuration value by path (`path/to/the/node`).
     *
     * @param {string} cfg_path
     * @return {string|boolean|number|Object}
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
     * @param {string} cfg_path
     * @param {string|boolean|number|Object} data
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

    /** Object finalization (result) */
    return Object.freeze(this);
}


/** =============================================================================
 * Module exports.
 * =========================================================================== */
module.exports = TeqFw_Core_App_Config;