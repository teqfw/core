/**
 * Empty handler to map to any backend route.
 */
export default class TeqFw_Core_App_Server_Route_Handler_Empty {
    constructor() {
        /**
         * Send text to the web.
         * @memberOf TeqFw_Core_App_Server_Route_Handler_Empty.prototype
         */
        this.exec = function (req, res, next) {
            res.send("Empty handler is here!!");
            // next();
        };
    }
}