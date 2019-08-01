"use strict";

/**
 * This object is executed on application initialization.
 *
 * @param {TeqFw_Core_App_Logger} TeqFw_Core_App_Logger
 * @param {TeqFw_Core_App_Commander} TeqFw_Core_App_Commander
 * @param {TeqFw_Core_App_Registry_Server_Route} TeqFw_Core_App_Registry_Server_Route
 * @param {TeqFw_Core_App_Cli_Server_Start} TeqFw_Core_App_Cli_Server_Start
 * @param {TeqFw_Core_App_Cli_Server_Stop} TeqFw_Core_App_Cli_Server_Stop
 * @param {TeqFw_Core_App_Server_Route_Handler_Empty} TeqFw_Core_App_Server_Route_Handler_Empty
 * @param {TeqFw_Core_App_Server_Route_Handler_Config_Get} TeqFw_Core_App_Server_Route_Handler_Config_Get
 * @return {TeqFw_Core_App_Sys_App_Init}
 * @constructor
 */
function TeqFw_Core_App_Sys_App_Init(
    TeqFw_Core_App_Logger,
    TeqFw_Core_App_Commander,
    TeqFw_Core_App_Registry_Server_Route,
    TeqFw_Core_App_Cli_Server_Start,
    TeqFw_Core_App_Cli_Server_Stop,
    TeqFw_Core_App_Server_Route_Handler_Empty,
    TeqFw_Core_App_Server_Route_Handler_Config_Get
) {
    const _logger = TeqFw_Core_App_Logger;
    /** @type {TeqFw_Core_App_Commander} */
    const _commander = TeqFw_Core_App_Commander;
    /** @type {TeqFw_Core_App_Registry_Server_Route} */
    const _reg_back_routes = TeqFw_Core_App_Registry_Server_Route;
    /** @type {TeqFw_Core_App_Cli_Server_Start} */
    const _command_start = TeqFw_Core_App_Cli_Server_Start;
    /** @type {TeqFw_Core_App_Cli_Server_Stop} */
    const _command_stop = TeqFw_Core_App_Cli_Server_Stop;
    /** @type {TeqFw_Core_App_Server_Route_Handler_Empty} */
    const _hndl_empty = TeqFw_Core_App_Server_Route_Handler_Empty;
    /** @type {TeqFw_Core_App_Server_Route_Handler_Config_Get} */
    const _hndl_config_get = TeqFw_Core_App_Server_Route_Handler_Config_Get;

    /**
     * Perform initialization of the module.
     *
     * @return {Promise<void>}
     */
    this.exec = async function () {
        function init_commander() {
            _commander.addCommand({
                flags: "--core-server-start",
                description: "Start application's web server.",
                action: _command_start.exec
            });
            _commander.addCommand({
                flags: "--core-server-stop",
                description: "Stop application's web server.",
                action: _command_stop.exec
            });
        }

        function init_back_routes() {
            _reg_back_routes.add({path: "/core/app/config/get", handler: _hndl_config_get});
        }

        init_commander();
        init_back_routes();
        _logger.info("Init Server module.");
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Sys_App_Init;