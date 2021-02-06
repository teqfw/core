/**
 * Template for factories to create API services.
 * @interface
 */
export default class TeqFw_Core_App_Server_Handler_Api_Factory {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {TeqFw_Core_App_Server_Handler_Api_Factory.service}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * Parse input data and compose API request data object.
             * @param {TeqFw_Core_App_Server_Request_Context} context HTTP2 request context
             */
            function parseInput(context) {
            }

            /**
             * Service to handle HTTP API requests.
             *
             * @param {TeqFw_Core_App_Server_Request_Context} context
             * @returns {Promise<void>}
             * @memberOf TeqFw_Core_App_Server_Handler_Api_Factory
             * @interface
             */
            async function service(context) {
                // PARSE INPUT & DEFINE WORKING VARS
                /** @type {String} */
                const body = context[DEF.HTTP_REQ_CTX_BODY];
                /** @type {Number} */
                const flags = context[DEF.HTTP_REQ_CTX_FLAGS];
                /** @type {IncomingHttpHeaders} */
                const headers = context[DEF.HTTP_REQ_CTX_HEADERS];
                /** @type {ServerHttp2Stream} */
                const stream = context[DEF.HTTP_REQ_CTX_STREAM];

                // DEFINE INNER FUNCTIONS
                // MAIN FUNCTIONALITY
                // COMPOSE RESULT
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {
                value: `${this.constructor.name}.${service.name}`,
            });
            return service;
        };

        /**
         * Route to the service inside this plugin namespace (see DEF.BACK_REALM).
         * @returns {String}
         */
        this.getRoute = function () {
            return DEF.API_LOAD_NS; // place relative route to DEF object
        };
    }
}
