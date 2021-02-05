import $path from 'path';
import {constants as H2} from 'http2';

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

        /**
         * @return {Promise<TeqFw_Core_App_Server_Handler_Api.handler>}
         */
        this.createHandler = async function () {
            // PARSE INPUT & DEFINE WORKING VARS
            const regexApi = new RegExp(`^(/${DEF.REALM_API}/)(.*)`);
            let router = {};

            // DEFINE INNER FUNCTIONS

            /**
             * @name handler
             * @param {Object} context
             * @return {Promise<Boolean>}
             * @memberOf TeqFw_Core_App_Server_Handler_Api
             */
            async function handler(context) {
                // DEFINE INNER FUNCTIONS
                /** @type {String} */
                const body = context[DEF.HTTP_REQ_CTX_BODY];
                /** @type {IncomingHttpHeaders} */
                const headers = context[DEF.HTTP_REQ_CTX_HEADERS];
                /** @type {ServerHttp2Stream} */
                const stream = context[DEF.HTTP_REQ_CTX_STREAM];

                // MAIN FUNCTIONALITY
                let result = false;
                try {
                    const path = headers[H2.HTTP2_HEADER_PATH];
                    const parts = regexApi.exec(path);
                    if (Array.isArray(parts)) {
                        for (const route in router) {
                            const uri = headers[H2.HTTP2_HEADER_PATH];
                            if (route === uri) {
                                const parser = router[route].parser;
                                const processor = router[route].processor;
                                const req = await parser(body, headers);
                                const {response, headers: moreHeaders} = await processor(req, headers);
                                if (response) {
                                    if (stream.writable) {
                                        if (moreHeaders) {
                                            stream.respond(moreHeaders);
                                        }
                                        stream.respond({
                                            [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_OK,
                                            [H2.HTTP2_HEADER_CONTENT_TYPE]: 'application/json'
                                        });
                                        const json = JSON.stringify({data: response});
                                        stream.end(json);
                                        result = true;
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    debugger;
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            // compose static routes map for plugins
            logger.debug('Map plugins API services:');
            const items = registry.items();
            for (const item of items) {
                if (item.initClass) {
                    /** @type {TeqFw_Core_App_Plugin_Init} */
                    const plugin = await container.get(item.initClass, this.constructor.name);
                    if (plugin && (typeof plugin.getHttp2Services === 'function')) {
                        const realm = plugin.getHttp2BackRealm();
                        const prefix = $path.join('/', DEF.REALM_API, realm);
                        const map = plugin.getHttp2Services();
                        for (const one of map) {
                            /** @type {TeqFw_Core_App_Back_Service_LoadNs} */
                            const factory = await container.get(one);
                            const tail = factory.getRoute();
                            const route = $path.join(prefix, tail);
                            const parser = factory.createParser();
                            /** @type {TeqFw_Core_App_Back_Service_LoadNs.processor} */
                            const processor = factory.createProcessor();
                            router[route] = {parser, processor};
                            logger.debug(`    ${route} => ${one}`);
                        }
                    }
                }
            }

            // COMPOSE RESULT
            Object.defineProperty(handler, 'name', {
                value: this.constructor.name + '.' + handler.name,
            });
            return handler;
        };
    }

}
