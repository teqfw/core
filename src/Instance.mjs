/**
 * @namespace TeqFw_Core_App
 */
import Container from "@teqfw/di";
import $url from "url";
import $path from 'path';
import $fs from "fs";

const __filename = $url.fileURLToPath(import.meta.url);
const __dirname = $path.dirname(__filename);

/**
 * @memberOf TeqFw_Core_App
 */
export default class TeqFw_Core_App_Instance {
    constructor({root, version}) {
        /** @type {string} path to the root folder of the app */
        const _root = root;
        const _version = version;
        /** @type {TeqFw_Di_Container} */
        const _container = new Container();
        /** @type {TeqFw_Core_App_Logger} */
        let _logger;

        /**
         * @memberOf TeqFw_Core_App_Instance.prototype
         */
        this.start = function () {

            function init_logger() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Logger")
                        .then(/** @type {TeqFw_Core_App_Logger} */(logger) => {
                            _logger = logger;
                            logger.debug("Application logger is created.");
                            resolve();
                        });
                });
            }

            function load_config() {
                return new Promise(function (resolve) {
                    const path_local = $path.join(_root, "cfg", "local.json");
                    _logger.info(`Local configuration is read from '${path_local}'.`);
                    $fs.readFile(path_local, (err, data) => {
                        if (err) throw err;
                        const local = JSON.parse(data.toString());
                        _container.get("TeqFw_Core_App_Configurator")
                            .then(/** @type {TeqFw_Core_App_Configurator} */(configurator) => {
                                // save local configuration to "local" node
                                const json = {local};
                                // add path to app root folder
                                json.path = {root: _root};
                                configurator.init(json);
                                resolve();
                            });
                    });
                });
            }

            function load_modules() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Module_Loader")
                        .then(/** @type {TeqFw_Core_App_Module_Loader} */(loader) => {
                            loader.exec(_root)
                                .then(resolve);
                        });
                });
            }

            function init_autoloader() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Module_NsMapper")
                        .then(/** @type {TeqFw_Core_App_Module_NsMapper} */(mapper) => {
                            mapper.exec()
                                .then(resolve);
                        });
                });
            }

            function connect_db() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Db_Connector")
                        .then(/** @type {TeqFw_Core_App_Db_Connector} */(db) => {
                            db.init()
                                .then(() => {
                                    _logger.info("AppInit: Database connection is created.");
                                    resolve();
                                });
                        });
                });
            }

            function config_logger() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Logger_Transport_Console")
                        .then(/** @type {TeqFw_Core_App_Logger_Transport_Console} */(trn_console) => {
                            _logger.addTransport(trn_console);
                            _container.get("TeqFw_Core_App_Logger_Transport_Db")
                                .then(/** @type {TeqFw_Core_App_Logger_Transport_Db} */(trn_db) => {
                                    _logger.addTransport(trn_db);
                                    _logger.debug("Application logger is configured.");
                                    resolve();
                                });
                        });
                });
            }

            function init_commander() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Commander")
                        .then(/** @type {TeqFw_Core_App_Commander} */(commander) => {
                            commander.setVersion(_version);
                            _logger.info("AppInit: Application Commander is created.");
                            resolve();
                        });
                });
            }

            function init_modules() {
                return new Promise(function (resolve) {
                    _container.get("TeqFw_Core_App_Module_Initializer")
                        .then(/** @type {TeqFw_Core_App_Module_Initializer} */(initializer) => {
                            initializer.exec().then(resolve);
                        });
                });
            }

            function run_commander() {
                _logger.info("AppInit: Initialization is completed. Run requested command.");
                _container.get("TeqFw_Core_App_Commander")
                    .then(/** @type {TeqFw_Core_App_Commander} */(commander) => {
                        commander.run();
                    });
            }

            // register current NS in DI container & place application into DI container
            _container.addSourceMapping("TeqFw_Core_App", __dirname);
            _container.put("TeqFw_Core_App_Instance", this);
            // init logger, load configuration, etc.
            init_logger()
                .then(load_config)
                .then(load_modules)
                .then(init_autoloader)
                .then(connect_db)
                .then(config_logger)
                .then(init_commander)
                .then(init_modules)
                .then(run_commander)
                .catch((e) => {
                    console.error("Application error: " + e);
                    _logger.error("Application error: " + e);
                });
        }

        /**
         * @memberOf TeqFw_Core_App_Instance.prototype
         */
        this.stop = async function () {
            _logger.info("Close the application.");
            /** @type {TeqFw_Core_App_Db_Connector} */
            const db = await _container.get("TeqFw_Core_App_Db_Connector");
            const knex = db.get();
            const pool = knex.client.pool;
            return new Promise(function (resolve, reject) {
                const WAIT = 100;

                /**
                 * Check DB connections in loop and close all when all connections will be released.
                 */
                function check_pool() {
                    const acquires = pool.numPendingAcquires();
                    const creates = pool.numPendingCreates();
                    const pending = acquires + creates;
                    if (pending > 0) {
                        // wait until all connections will be released
                        setTimeout(check_pool, WAIT);
                    } else {
                        // close all connections
                        knex.destroy();
                        resolve();
                    }
                }

                setTimeout(check_pool, WAIT);
            });
        };
    }
}