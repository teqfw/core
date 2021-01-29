/**
 * Logger to print out basic information about request.
 */
export default class TeqFw_Core_App_Server_Middle_Log {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton

        /**
         * @return {TeqFw_Core_App_Server_Middle_Log_Handler}
         */
        this.createHandler = function () {

            /**
             * Handler to process HTTP requests as middleware and to log request data.
             * @param req
             * @param res
             * @param next
             * @constructor
             */
            function TeqFw_Core_App_Server_Middle_Log_Handler(req, res, next) {
                try {
                    logger.debug(`${req.method} ${req.url}`);
                } catch (e) {
                    console.error(`Error in logging middleware: ${e}`);
                }
                next();
            }

            return TeqFw_Core_App_Server_Middle_Log_Handler;
        };
    }

}
