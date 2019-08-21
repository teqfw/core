/**
 * Hardcoded configuration of the module.
 */
export default class TeqFw_Core_App_Config {
    constructor() {
        /**
         * Default port for listing.
         * @type {number}
         * @default
         * @memberOf TeqFw_Core_App_Config.prototype
         */
        this.SERVER_DEFAULT_PORT = 3000;
        /**
         * PID file to stop running server.
         * @type {string}
         * @default
         * @memberOf TeqFw_Core_App_Config.prototype
         */
        this.PID_FILE_NAME = "./var/server.pid";
    }
}