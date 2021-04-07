/**
 * Load local configuration data available for the front realms.
 */
class TeqFw_Core_App_Back_Service_Load_Config {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {typeof TeqFw_Core_App_Shared_Service_Route_Load_Config_Request} */
        const Request = spec['TeqFw_Core_App_Shared_Service_Route_Load_Config#Request'];   // class
        /** @type {typeof TeqFw_Core_App_Shared_Service_Route_Load_Config_Response} */
        const Response = spec['TeqFw_Core_App_Shared_Service_Route_Load_Config#Response']; // class

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        this.createParser = function () {

            /**
             *
             * @returns {TeqFw_Core_App_Shared_Service_Route_Load_Config_Request}
             * @memberOf TeqFw_Core_App_Back_Service_Load_Config
             */
            function parse() {
                return new Request();
            }

            // COMPOSE RESULT
            // add namespace marker to the object name
            Object.defineProperty(parse, 'name', {
                value: `${this.constructor.name}.${parse.name}`,
            });
            return parse;
        };

        this.createService = function () {
            /**
             * @returns {Promise<{response: TeqFw_Core_App_Shared_Service_Route_Load_Config_Response}>}
             * @memberOf TeqFw_Core_App_Back_Service_Load_Config
             */
            async function service() {
                const cfg = config.get();
                /** @type {TeqFw_Core_App_Shared_Service_Route_Load_Config_Response} */
                const response = Object.assign(new Response(), cfg.local.web);
                return {response};
            }

            // COMPOSE RESULT
            // add namespace marker to the object name
            Object.defineProperty(service, 'name', {
                value: `${this.constructor.name}.${service.name}`,
            });
            return service;
        };

        this.getRoute = function () {
            return DEF.API_LOAD_CFG;
        };
    }
}

export default TeqFw_Core_App_Back_Service_Load_Config;
