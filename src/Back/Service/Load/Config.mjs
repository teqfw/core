/**
 * Load local configuration data available for the front realms.
 */
export default class TeqFw_Core_App_Back_Service_Load_Config {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {typeof TeqFw_Core_App_Shared_Api_Route_Load_Config_Request} */
        const Request = spec['TeqFw_Core_App_Shared_Api_Route_Load_Config#Request'];   // class constructor
        /** @type {typeof TeqFw_Core_App_Shared_Api_Route_Load_Config_Response} */
        const Response = spec['TeqFw_Core_App_Shared_Api_Route_Load_Config#Response']; // class constructor

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        this.createParser = function () {

            /**
             *
             * @return {TeqFw_Core_App_Shared_Api_Route_Load_Config_Request}
             * @memberOf TeqFw_Core_App_Back_Service_Load_Config
             */
            function parser() {
                return new Request();
            }

            // COMPOSE RESULT
            // add namespace marker to the object name
            Object.defineProperty(parser, 'name', {
                writable: false,
                value: this.constructor.name + '.' + parser.name,
            });
            return parser;
        };

        this.createProcessor = function () {
            /**
             * @return {Promise<{response: TeqFw_Core_App_Shared_Api_Route_Load_Config_Response}>}
             * @memberOf TeqFw_Core_App_Back_Service_Load_Config
             */
            async function processor() {
                const cfg = config.get();
                /** @type {TeqFw_Core_App_Shared_Api_Route_Load_Config_Response} */
                const response = Object.assign(new Response(), cfg.local.web);
                return {response};
            }

            // COMPOSE RESULT
            // add namespace marker to the object name
            Object.defineProperty(processor, 'name', {
                writable: false,
                value: this.constructor.name + '.' + processor.name,
            });
            return processor;
        };

        this.getRoute = function () {
            return '/load/config';
        };
    }
}
