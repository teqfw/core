"use strict";


/**
 * Transport to print out logs to console.
 *
 * @return {TeqFw_Core_App_Logger_Transport_Console}
 * @constructor
 */
function TeqFw_Core_App_Logger_Transport_Console() {

    this.process = function (logs) {
        for (const one of logs) {
            console.log(JSON.stringify(one));
        }
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Logger_Transport_Console;