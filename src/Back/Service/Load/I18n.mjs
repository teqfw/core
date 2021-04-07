/**
 * Load i18n resources.
 *
 * @namespace TeqFw_Core_App_Back_Service_Load_I18n
 */
class TeqFw_Core_App_Back_Service_Load_I18n {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_I18n_Loader} */
        const loader = spec['TeqFw_Core_App_I18n_Loader$'];   // instance singleton
        /** @type {typeof TeqFw_Core_App_Shared_Service_Route_Load_I18n_Request} */
        const Request = spec['TeqFw_Core_App_Shared_Service_Route_Load_I18n#Request'];   // class
        /** @type {typeof TeqFw_Core_App_Shared_Service_Route_Load_I18n_Response} */
        const Response = spec['TeqFw_Core_App_Shared_Service_Route_Load_I18n#Response']; // class

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        this.createParser = function () {

            /**
             * @returns {TeqFw_Core_App_Shared_Service_Route_Load_I18n_Request}
             * @memberOf TeqFw_Core_App_Back_Service_Load_I18n
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
             * @returns {Promise<{response: TeqFw_Core_App_Shared_Service_Route_Load_I18n_Response}>}
             * @memberOf TeqFw_Core_App_Back_Service_Load_I18n
             */
            async function service() {
                const dictionary = await loader.loadResources();
                /** @type {TeqFw_Core_App_Shared_Service_Route_Load_I18n_Response} */
                const response = Object.assign(new Response(), dictionary);
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
            return DEF.API_LOAD_I18N;
        };
    }
}

export default TeqFw_Core_App_Back_Service_Load_I18n;
