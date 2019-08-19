"use strict";
const $fs = require("fs");
const $path = require("path");

/**
 * Command to start application's web server.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @param {TeqFw_Core_App_Config} TeqFw_Core_App_Config
 * @param {TeqFw_Core_App_Server} TeqFw_Core_App_Server
 * @return {TeqFw_Core_App_Cli_Server_Start}
 * @constructor
 */
function TeqFw_Core_App_Cli_Server_Start(
    TeqFw_Core_App_Configurator,
    TeqFw_Core_App_Config,
    TeqFw_Core_App_Server
) {
    /* Definitions of the object structures */
    /**
     * @typedef {Object} TeqFw_Core_App_Cli_Server_Start.OwnType
     * @property {string} prop_str
     * @property {Object} prop_obj
     */

    /* Private properties of the object */
    /** @type {TeqFw_Core_App_Configurator} */
    const _config = TeqFw_Core_App_Configurator;
    /** @type {TeqFw_Core_App_Config} */
    const _cfg = TeqFw_Core_App_Config;
    /** @type {TeqFw_Core_App_Server} */
    const _server = TeqFw_Core_App_Server;


    /* Public methods of the object */
    /**
     * Start web server and save PID into file.
     */
    this.exec = function () {
        const pid = process.pid;
        const path_root = _config.get("path/root");
        const pid_path = $path.join(path_root, _cfg.PID_FILE_NAME);
        // write PID to file then start the server
        $fs.writeFile(pid_path, pid, (err) => {
            if (err) throw err;
            // PID is wrote => start the server
            _server.listen(_cfg.SERVER_DEFAULT_PORT, (err) => {
                console.log(`Web server is listening on port ${_cfg.SERVER_DEFAULT_PORT}. PID: ${pid}.`);
            });
        });
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Cli_Server_Start;