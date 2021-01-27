/**
 * Application's web server.
 */
// NODE.JS IMPORTS
import $cookieParser from 'cookie-parser';
import $express from 'express';

// MODULE'S EXPORT
export default class TeqFw_Core_App_Server {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Di_Container} */
        const container = spec['TeqFw_Di_Container$'];  // instance singleton

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const server = $express();

        // DEFINE THIS INSTANCE METHODS
        this.addApiRoute = async function (route, dependencyId) {
            const handler = await container.get(dependencyId);
            server.all(route, handler.handle);
        };

        this.init = async function () {
            // setup order is important
            server.use($cookieParser());
            server.use($express.json({limit: '50mb'}));

            // static resources in project
            // const pathRoot = config.get('path/root');
            // const pathPub = $path.join(pathRoot, 'node_modules/@flancer32/pwa_leana_app/web');
            // server.use($serveStatic(pathPub));
            // static resources in modules
            // server.get('*', routeStatic.handle);
            // default route
            server.all('*', function (req, res) {
                // logger.debug(`${req.method} ${req.url}`);
                // COMPOSE RESULT
                res.status(404);
                res.setHeader('Content-Type', 'text/plain');
                res.end(`The route '${req.url}' is not found on the server.`);
            });
        };


        /**
         * Run web server.
         *
         * @param {number} port
         * @param {Function} callable
         */
        this.listen = async function (port, callable) {
            await server.listen(port, callable);
        };
    }
}
