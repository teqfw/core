"use strict";

/**
 * Empty handler to map to any backend route.
 *
 * @return {TeqFw_Core_App_Server_Route_Handler_Empty}
 * @constructor
 */
function TeqFw_Core_App_Server_Route_Handler_Empty() {

    /**
     * Send text to the web.
     */
    this.exec = function (req, res, next) {
        console.log("Empty handler is here!!");
        res.send("Empty handler is here!!");
        // next();
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Server_Route_Handler_Empty;