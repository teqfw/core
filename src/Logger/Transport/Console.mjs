/**
 * Transport to print out logs to console.
 */
export default class TeqFw_Core_App_Logger_Transport_Console {
    constructor() {

        /**
         * Process all log entries.
         *
         * @param logs
         * @memberOf TeqFw_Core_App_Logger_Transport_Console.prototype
         */
        this.process = function (logs) {
            for (const one of logs) {
                console.log(JSON.stringify(one));
            }
        };
    }
}