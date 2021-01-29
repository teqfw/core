import $cookieParser from 'cookie-parser';
import $express from 'express';
import $fs from 'fs';
import $path from 'path';

/**
 * Application's web server.
 */
export default class TeqFw_Core_App_Server {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Di_Container} */
        const container = spec['TeqFw_Di_Container$'];  // instance singleton
        /** @type {TeqFw_Core_App_Server_Middle_Log} */
        const factMdlLogger = spec['TeqFw_Core_App_Server_Middle_Log$'];  // instance singleton
        /** @type {TeqFw_Core_App_Server_Handler_Static} */
        const factHndlStatic = spec['TeqFw_Core_App_Server_Handler_Static$'];   // instance singleton

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
            server.use(factMdlLogger.createHandler());

            // static resources in project
            const pathRoot = config.get('path/root');
            const file404 = $path.join(pathRoot, DEF.FS_WEB, '404.html');
            // const pathPub = $path.join(pathRoot, 'node_modules/@flancer32/pwa_leana_app/web');
            // server.use($serveStatic(pathPub));
            // static resources in modules
            // server.get('*', routeStatic.handle);
            server.get('*', factHndlStatic.createHandler());
            // default handler
            server.all('*', function (req, res) {
                res.status(404);
                if ($fs.existsSync(file404)) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Content-Type', 'text/html');
                    res.sendFile(file404);
                } else {
                    res.setHeader('Content-Type', 'text/plain');
                    res.end(`The route '${req.url}' is not found on the server.`);
                }
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
