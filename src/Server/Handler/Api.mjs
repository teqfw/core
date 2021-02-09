import $path from 'path';
import {constants as H2} from 'http2';

const PARSE = 'parse';
const SERVICE = 'service';

/**
 * Factory to create handler for API requests.
 */
export default class TeqFw_Core_App_Server_Handler_Api {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Di_Container} */
        const container = spec[DEF.DI_CONTAINER];   // named singleton
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // instance singleton
        /** @type {typeof TeqFw_Core_App_Server_Handler_Api_Context} */
        const ApiContext = spec['TeqFw_Core_App_Server_Handler_Api_Context#']; // class constructor


        /**
         * @return {Promise<TeqFw_Core_App_Server_Handler_Factory.handler>}
         */
        this.createHandler = async function () {
            // PARSE INPUT & DEFINE WORKING VARS
            const regexApi = new RegExp(`^(/${DEF.REALM_API}/)(.*)`);
            let router = {};

            // DEFINE INNER FUNCTIONS

            /**
             * Handler to process API requests.
             *
             * @param {TeqFw_Core_App_Server_Http2_Context} httpCtx
             * @return {Promise<Boolean>}
             * @memberOf TeqFw_Core_App_Server_Handler_Api
             * @implements {TeqFw_Core_App_Server_Handler_Factory.handler}
             */
            async function handler(httpCtx) {
                // DEFINE INNER FUNCTIONS
                /** @type {Object<String, String>} */
                const headers = httpCtx.headers;
                /** @type {ServerHttp2Stream} */
                const stream = httpCtx.stream;
                /** @type {TeqFw_Core_App_Server_Handler_Api_Context} */
                const apiCtx = new ApiContext();
                apiCtx.sharedContext = httpCtx.shared;

                // MAIN FUNCTIONALITY
                let result = false;
                const path = headers[H2.HTTP2_HEADER_PATH];
                const parts = regexApi.exec(path);
                if (Array.isArray(parts)) {
                    for (const route in router) {
                        const uri = headers[H2.HTTP2_HEADER_PATH];
                        if (route === uri) {
                            const parser = router[route][PARSE];
                            const service = router[route][SERVICE];
                            if (typeof parser === 'function') {
                                // TODO: add HTTP 400 Bad request state processing
                                apiCtx.request = parser(httpCtx);
                            }
                            const {response, headers: moreHeaders} = await service(apiCtx);
                            if (response) {
                                if (stream.writable) {
                                    let headsOut = {
                                        [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_OK,
                                        [H2.HTTP2_HEADER_CONTENT_TYPE]: 'application/json'
                                    };
                                    if (moreHeaders) {
                                        headsOut = Object.assign({}, moreHeaders, headsOut);
                                    }
                                    stream.respond(headsOut);
                                    const json = JSON.stringify({data: response});
                                    stream.end(json);
                                    result = true;
                                }
                            }
                        }
                    }
                }
                return result;
            }

            /**
             * Compose static routes map for plugins.
             *
             * @param {String} mainClassName context name for DI container to get plugin initializers.
             * @returns {Promise<void>}
             */
            async function initRoutes(mainClassName) {
                logger.debug('Map plugins API services:');
                const items = registry.items();
                for (const item of items) {
                    if (item.initClass) {
                        /** @type {TeqFw_Core_App_Plugin_Init} */
                        const plugin = await container.get(item.initClass, mainClassName);
                        if (plugin && (typeof plugin.getHttp2Services === 'function')) {
                            const realm = plugin.getHttp2BackRealm();
                            const prefix = $path.join('/', DEF.REALM_API, realm);
                            const map = plugin.getHttp2Services();
                            for (const one of map) {
                                /** @type {TeqFw_Core_App_Server_Handler_Api_Factory} */
                                const factory = await container.get(one, mainClassName);
                                const tail = factory.getRoute();
                                const route = $path.join(prefix, tail);
                                logger.debug(`    ${route} => ${one}`);
                                router[route] = {};
                                if (typeof factory.createInputParser === 'function') {
                                    /** @type {TeqFw_Core_App_Server_Handler_Api_Factory.parse} */
                                    router[route][PARSE] = factory.createInputParser();
                                }
                                /** @type {TeqFw_Core_App_Server_Handler_Api_Factory.service} */
                                const service = factory.createService();
                                router[route][SERVICE] = service;
                            }
                        }
                    }
                }
            }

            // MAIN FUNCTIONALITY
            await initRoutes(this.constructor.name);

            // COMPOSE RESULT
            Object.defineProperty(handler, 'name', {value: `${this.constructor.name}.${handler.name}`});
            return handler;
        };
    }

}
