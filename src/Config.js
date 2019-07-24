"use strict";

/**
 * Hardcode configuration object for the module.
 *
 * @return {TeqFw_Core_App_Config}
 * @constructor
 */
function TeqFw_Core_App_Config() {
    /**
     * Default port for listing.
     * @type {number}
     * @default
     */
    this.SERVER_DEFAULT_PORT = 3000;
    /**
     * PID file to stop running server.
     * @type {string}
     * @default
     */
    this.PID_FILE_NAME = "./var/server.pid";

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Config;