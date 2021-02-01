import $path from 'path';

/**
 * Load namespaces data to initialize DI container on the front.
 */
export default class TeqFw_Core_App_Back_Service_LoadNs {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // instance singleton
        /** @type {typeof TeqFw_Core_App_Shared_Api_Route_LoadNs_Request} */
        const Request = spec['TeqFw_Core_App_Shared_Api_Route_LoadNs#Request'];   // class constructor
        /** @type {typeof TeqFw_Core_App_Shared_Api_Route_LoadNs_Response} */
        const Response = spec['TeqFw_Core_App_Shared_Api_Route_LoadNs#Response']; // class constructor
        /** @type {typeof TeqFw_Core_App_Shared_Api_Route_LoadNs_ResponseItem} */
        const DItem = spec['TeqFw_Core_App_Shared_Api_Route_LoadNs#ResponseItem']; // class constructor

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const namespaces = getNamespaces(registry); // cache for namespaces

        // DEFINE INNER FUNCTIONS
        /**
         * Loop through all plugins and compose namespace mapping for static sources.
         * (@see TeqFw_Core_App_Server_Handler_Static_Fn)
         * @param {TeqFw_Core_App_Plugin_Registry} registry
         */
        function getNamespaces(registry) {
            const result = {};
            const plugins = registry.items();
            for (const one of plugins) {
                /** @type {TeqFw_Core_App_Plugin_Package_Data_Autoload} */
                const auto = one.teqfw.autoload;
                const srcUrl = $path.join('/', DEF.REALM_SRC, one.name);
                const item = Object.assign(new DItem(), auto);
                item.path = srcUrl;
                result[item.ns] = item;
            }
            return result;
        }

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)
        this.createParser = function () {

            /**
             *
             * @return {TeqFw_Core_App_Shared_Api_Route_LoadNs_Request}
             * @name TeqFw_Core_App_Back_Service_LoadNs.parser
             */
            function parser() {
                return new Request();
            }

            Object.defineProperty(parser, 'name', {
                writable: false,
                value: this.constructor.name + '.' + parser.name,
            });
            return parser;
        };

        this.createProcessor = function () {
            /**
             *
             * @return {Promise<{response: TeqFw_Core_App_Shared_Api_Route_LoadNs_Response}>}
             * @name TeqFw_Core_App_Back_Service_LoadNs.processor
             */
            async function processor() {
                const response = new Response();
                response.items = namespaces;
                return {response};
            }

            Object.defineProperty(processor, 'name', {
                writable: false,
                value: this.constructor.name + '.' + processor.name,
            });
            return processor;
        };

        this.getRoute = function () {
            return '/loadNs';
        };
    }
}
