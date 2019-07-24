"use strict";

/**
 * This object is executed on application initialization.
 *
 * @param {TeqFw_Core_App_Commander} TeqFw_Core_App_Commander
 * @param {TeqFw_Core_App_Cli_Server_Start} TeqFw_Core_App_Cli_Server_Start
 * @param {TeqFw_Core_App_Cli_Server_Stop} TeqFw_Core_App_Cli_Server_Stop
 * @return {TeqFw_Core_App_Sys_App_Init}
 * @constructor
 */
function TeqFw_Core_App_Sys_App_Init(
    TeqFw_Core_App_Commander,
    TeqFw_Core_App_Cli_Server_Start,
    TeqFw_Core_App_Cli_Server_Stop
) {
    /** @type {TeqFw_Core_App_Commander} */
    const _commander = TeqFw_Core_App_Commander;
    /** @type {TeqFw_Core_App_Cli_Server_Start} */
    const _commandStart = TeqFw_Core_App_Cli_Server_Start;
    /** @type {TeqFw_Core_App_Cli_Server_Stop} */
    const _commandStop = TeqFw_Core_App_Cli_Server_Stop;

    /**
     * Perform initialization of the module.
     *
     * @return {Promise<void>}
     */
    this.exec = async function () {
        _commander.addCommand({
            flags: "--core-server-start",
            description: "Start application's web server.",
            action: _commandStart.exec
        });
        _commander.addCommand({
            flags: "--core-server-stop",
            description: "Stop application's web server.",
            action: _commandStop.exec
        });
        console.log("Init Server module.");
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Sys_App_Init;