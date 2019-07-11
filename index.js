/**
 * Application itself.
 *
 * @namespace TeqFw_Core_App
 */
"use strict";


/** =============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");
const path = require("path");
const commander = require("commander");


/** =============================================================================
 * Define this nodejs module working elements (objects, functions, etc).
 * =========================================================================== */

/** =============================================================================
 * TeqFW object composition.
 * =========================================================================== */
/**
 * TeqFW application.
 *
 * @return {TeqFw_Core_App}
 * @constructor
 */
function TeqFw_Core_App() {
    /** Object properties (private) */
    const _commander = commander;

    /** Object properties (public) */

    /** Object methods (private) */


    /** Object methods (public) */
    this.commandAdd = function (spec) {
        let {flags, description, fnAction} = spec;
        _commander.option(flags, description, fnAction);
    };

    /**
     * Initialize application then run CLI commander.
     */
    this.run = function (spec) {
        const {root: _root, version: _version} = spec;
        let _app_modules, _object_manager;

        /* Local scope functions */

        /**
         * Create structure for `global.teqfw` container.
         *
         * @return {Promise<void>}
         */
        function init_globals(app) {
            return new Promise(function (resolve) {
                global["teqfw"] = {};
                const teqfw = global["teqfw"];
                teqfw.app = app;
                teqfw.object_manager = {};
                teqfw.mod = {};
                teqfw.core = {app: {modules: {}}};
                console.log("Structure for `global.teqfw` is populated.");
                resolve();
            });
        }


        /**
         * Load teqfw-modules definitions and save map to global.teqfw.core.app.modules.
         *
         * @return {Promise<void>}
         */
        function load_modules_defs() {
            /**
             * @typedef {Object} TeqFw_Core_App.ModuleScanData
             * @property {string} path - Absolute path to module's root ("/.../app/node_modules/teqfw-core-di")
             * @property {Object} desc - teqfw-descriptor from `package.json`
             */

            /* Local scope functions */
            /**
             * Read all `./node_modules/.../package.json` and return map of "name"=>"package.json/teqfw node".

             * @return {Promise<Map>}
             */
            function scan_modules() {
                return new Promise(function (resolve, reject) {
                    const result = new Map();
                    const dir_node_modules = path.join(_root, "node_modules");
                    // read all folders in `./node_modules/``
                    fs.readdir(dir_node_modules, (err, dirs) => {
                        if (err) reject(err);
                        let itemsProcessed = 0;
                        dirs.forEach((item, index, array) => {
                            // read `package.json` for every module
                            const dir_package = path.join(dir_node_modules, item);
                            const file_package = path.join(dir_package, "package.json");
                            fs.stat(file_package, (err, stats) => {
                                if (err) {
                                    // skip folders w/o package.json
                                    itemsProcessed += 1;
                                } else {
                                    if (stats.isFile()) {
                                        // parse `package.json` and find `teqfw` node inside
                                        fs.readFile(file_package, (err, raw_data) => {
                                            itemsProcessed += 1;
                                            if (err) throw err;
                                            let package_json = JSON.parse(raw_data);
                                            // `teqfw` node means that module is TeqFW module
                                            if (package_json.teqfw) {
                                                const package_name = package_json.name;
                                                /** @type TeqFw_Core_App.ModuleScanData */
                                                const desc = {path: dir_package, desc: package_json.teqfw};
                                                result.set(package_name, desc);
                                            }
                                            // return result if all folders in `./node_modules` were processed.
                                            if (itemsProcessed >= array.length) {
                                                resolve(result);
                                            }
                                        });
                                    } else {
                                        itemsProcessed += 1;
                                    }
                                }
                            });
                        });
                    });
                });
            }

            /* Result */
            return new Promise(function (resolve,) {
                scan_modules().then((modules) => {
                    _app_modules = modules;
                    resolve();
                });
            });
        }

        /**
         * Create Object Manager, parse all teq-modules and save DI-related data into Object Manager.
         *
         * @return {Promise<void>}
         */
        function init_di() {
            return new Promise(function (resolve) {
                const teqfw = global["teqfw"];
                /** @type {Map<string, ModuleScanData>} modules */
                const modules = _app_modules;
                /** @type TeqFw_Core_Di */
                _object_manager = new (require("teqfw-core-di"))();
                teqfw.object_manager = _object_manager;
                for (const module of modules) {
                    const name = module[0];
                    const scan_data = module[1];
                    const path_src = path.join(scan_data.path, scan_data.desc.autoload.path);
                    /** @type {TeqFw_Core_Di.ModuleData} */
                    const di_data = {
                        ns: scan_data.desc.autoload.ns,
                        path: scan_data.path,
                        src: path_src
                    };
                    _object_manager.addModule({module: name, data: di_data});
                }
                resolve();
            });
        }

        /**
         * Create application configuration object and place it into Object Manager.
         *
         * @return {Promise<void>}
         */
        function create_config() {
            return new Promise(function (resolve) {
                const path_cfg_local = path.join(_root, "cfg", "local.json");
                const cfg_data = {
                    path: {root: _root},
                    version: _version
                };
                /** @type TeqFw_Core_App_Config */
                const config = _object_manager.get("TeqFw_Core_App_Config");
                config.init(cfg_data, path_cfg_local).then(resolve);
            });
        }

        /**
         * Create application commander, run through the teq-modules list and add module's commands to commander.
         *
         * @return {Promise<void>}
         */
        function init_commander() {
            return new Promise(function (resolve) {
                const app = global.teqfw.app;
                const obm = global.teqfw.object_manager;
                _commander.version(_version, "-v, --version");
                const web_server = obm.get("TeqFw_Core_Server");
                web_server.init(app).then(resolve);
            });
        }

        /**
         * Parse CLI arguments and execute the called command or print out help by default.
         */
        function run_commander() {
            _commander.parse(process.argv);
            if (!process.argv.slice(2).length) {
                _commander.outputHelp();
            }
        }

        /* This function actions. */
        init_globals(this)              // populate structure of globals.teqfw
            .then(load_modules_defs)    // save modules definitions to globals.teqfw.core.app.modules
            .then(init_di)              // initialize object manager (Dependency Injection)
            .then(create_config)        // create application config and put it into Object Manager
            .then(init_commander)       // initialize application commander
            .then(run_commander)        // run application commander
            .catch((reason) => {
                console.log("Application fatal error: " + reason);
                throw reason;
            })
    };

    /** Object finalization (result) */
    return Object.freeze(this);
}


/** =============================================================================
 * Module exports.
 * =========================================================================== */
module.exports = TeqFw_Core_App;

