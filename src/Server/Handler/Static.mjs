import $fs from 'fs';
import $mimeTypes from 'mime-types';
import $path from 'path';

/**
 * Factory to create handler for static files.
 */
export default class TeqFw_Core_App_Server_Handler_Static {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // instance singleton

        /**
         * @return {TeqFw_Core_App_Server_Handler_Static_Handler}
         */
        this.createHandler = function () {
            // PARSE INPUT & DEFINE WORKING VARS
            const rootFs = config.get('/path/root');    // path to project root
            const rootWeb = $path.join(rootFs, DEF.FS_WEB);    // default path to app web root
            const mapRoutes = {};   // '/@teqfw/core-app' => '/.../pwa_men2/node_modules/@teqfw/core-app'

            // DEFINE INNER FUNCTIONS

            /**
             * Handler to process HTTP requests as middleware and to log request data.
             * @param req
             * @param res
             * @param next
             * @constructor
             */
            async function TeqFw_Core_App_Server_Handler_Static_Handler(req, res, next) {
                // DEFINE INNER FUNCTIONS
                /**
                 * Compose absolute path to requested resource:
                 *  - /node/vue/vue.global.js => /node_modules/vue/dist/vue.global.js
                 *  - /favicon.ico => /src/web/favicon.ico
                 *
                 * @param {string} url
                 * @returns {string}
                 */
                function getPath(url) {
                    // DEFINE INNER FUNCTIONS
                    function pathMap(url) {
                        let result = url;
                        for (const key in mapRoutes) {
                            const one = mapRoutes[key];
                            const regex = new RegExp(`(.*)(/${DEF.REALM_STATIC}/${key})(.*)`);
                            const parts = regex.exec(url);
                            if (Array.isArray(parts)) {
                                const tail = parts[3];
                                result = `${one}/${tail}`;
                                result = result.replace(/\/\//g, '/');
                                break;
                            }
                        }
                        return result;
                    }

                    // MAIN FUNCTIONALITY
                    let result;
                    const mapped = pathMap(url);
                    if (url === mapped) {   // URL w/o mapping should be resolved relative to web root
                        result = $path.join(rootWeb, url);
                    } else {    // URL w mapping should be resolved relative to project root
                        result = mapped;
                    }
                    return result;
                }

                /**
                 * Read and return regular file (HTML, CSS, JS, imgase, ...).
                 *
                 * @param {string} path
                 * @returns {Promise<void>}
                 */
                async function processRegular(path) {
                    const mimeType = $mimeTypes.lookup(path);
                    if (mimeType) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('Content-Type', mimeType);
                        res.sendFile(path);
                    } else {
                        next();
                    }
                }

                // MAIN FUNCTIONALITY
                try {
                    const path = getPath(req.url);
                    if ($fs.existsSync(path) && $fs.statSync(path).isFile()) {
                        await processRegular(path);
                    } else {
                        next();
                    }
                } catch (err) {
                    const stack = (err.stack) ?? '';
                    const message = err.message ?? 'Unknown error';
                    const error = {message, stack};
                    const str = JSON.stringify({error});
                    logger.error(str);
                    next();
                }
            }

            // MAIN FUNCTIONALITY
            // compose static routes map for plugins
            const items = registry.items();
            for (const item of items) {
                mapRoutes[item.name] = $path.join(item.path, DEF.FS_WEB);
            }

            // COMPOSE RESULT
            return TeqFw_Core_App_Server_Handler_Static_Handler;
        };
    }

}
