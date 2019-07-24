"use strict";
const $fs = require("fs");
const $path = require("path");

/**
 * Command to stop application's web server.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @param {TeqFw_Core_App_Config} TeqFw_Core_App_Config
 * @return {TeqFw_Core_App_Cli_Server_Stop}
 * @constructor
 */
function TeqFw_Core_App_Cli_Server_Stop(
    TeqFw_Core_App_Configurator,
    TeqFw_Core_App_Config
) {
    /* Definitions of the object structures */
    /**
     * @typedef {Object} TeqFw_Core_App_Cli_Server_Stop.OwnType
     * @property {string} prop_str
     * @property {Object} prop_obj
     */

    /* Private properties of the object */
    /** @type {TeqFw_Core_App_Configurator} */
    const _config = TeqFw_Core_App_Configurator;
    /** @type {TeqFw_Core_App_Config} */
    const _cfg = TeqFw_Core_App_Config;

    /* Public methods of the object */
    /**
     * Read PID from file and stop web server process.
     */
    this.exec = function () {
        const path_root = _config.get("path/root");
        const pid_path = $path.join(path_root, _cfg.PID_FILE_NAME);
        $fs.readFile(pid_path, (err, data) => {
            if (err) throw err;
            const str_data = data.toString();
            console.log(`Stop web server (PID: ${str_data}).`);
            process.kill(str_data, "SIGINT");
        });
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Cli_Server_Stop;