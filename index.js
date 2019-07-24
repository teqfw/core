"use strict";
const $path = require("path");

/**
 * TeqFW application, main (and only) entry point.
 *
 * @return {TeqFw_Core_App}
 * @constructor
 */
function TeqFw_Core_App() {

    /**
     * Initialize application then run CLI commander to perform requested command.
     *
     * @param {Object} spec - Specification.
     * @property {string} spec.root - Absolute path to the root folder of the application.
     * @property {string} spec.version - Current version of the application.
     */
    this.run = function (spec) {
        /* Local scope properties */
        const {root: _root, version: _version} = spec;
        /** @type TeqFw_Core_App */
        let _app;

        /* Local scope functions */

        /**
         * Create structure for `global.teqfw` container.
         *
         * @return {Promise<void>}
         */
        function create_globals() {
            return new Promise(function (resolve) {
                global["teqfw"] = {};
                console.log("AppInit: `global.teqfw` object is created.");
                resolve();
            });
        }

        /**
         * Create Object Manager and place Object Manager into the global scope.
         * Add this Application object to Object Manager.
         * Create and empty Modules Registry and add to Object Manager.
         * Create Application Configurator, load local configuration from JSON, add Configurator to the Object Manager.
         *
         * @return {Promise<void>}
         */
        function create_main_objects() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_Di */
                const obm = new (require("teqfw-core-di"))();
                global["teqfw"].object_manager = obm;
                obm.put("TeqFw_Core_Di", obm);
                obm.put("TeqFw_Core_App", _app);
                // create Modules Registry
                /** @type TeqFw_Core_App_Registry_Module */
                const registry = new (require("./src/Registry/Module"))();
                obm.put("TeqFw_Core_App_Registry_Module", registry);
                // create Application Configurator and load local configuration
                /** @type TeqFw_Core_App_Configurator */
                const config = new (require("./src/Configurator"))();
                const path_cfg_local = $path.join(_root, "cfg", "local.json");
                const cfg_load = require("./src/_init/cfg_load");
                const cfg_local = cfg_load(path_cfg_local);
                const cfg_init = {
                    local: cfg_local,
                    path: {root: _root},
                    version: _version
                };
                config.init(cfg_init);
                obm.put("TeqFw_Core_App_Configurator", config);
                // finalize
                console.log("AppInit: Application's main objects are created.");
                resolve();
            });
        }

        /**
         * Load teqfw-modules definitions and save its to Modules Registry.
         * Read all `./node_modules/.../package.json` and compose map of "name"=>"package.json/teqfw node".
         *
         * @return {Promise<void>}
         */
        function load_modules_defs() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_Di */
                const obm = global["teqfw"].object_manager;
                /** @type TeqFw_Core_App_Configurator */
                const config = obm.get("TeqFw_Core_App_Configurator");
                const path_root = config.get("path/root");
                // direct load with `require` cause `object_manager` is not initiated yet
                const load = require("./src/_init/mod_load");
                load(path_root).then((mods) => {
                    // add modules to registry
                    /** @type TeqFw_Core_App_Registry_Module */
                    const reg = obm.get("TeqFw_Core_App_Registry_Module");
                    // load modules and initialize `object_manager`
                    reg.init(mods);
                    resolve();
                });

            });
        }

        /**
         * Create application commander and set application version.
         *
         * @return {Promise<void>}
         */
        function init_commander() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_App_Commander */
                const commander = global["teqfw"].object_manager.get("TeqFw_Core_App_Commander");
                commander.setVersion(_version);
                console.log("AppInit: Application Commander is created.");
                resolve();
            });
        }

        /**
         * Initialize DB connection..
         *
         * @return {Promise<void>}
         */
        function init_db() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_App_Db_Connector */
                const db = global["teqfw"].object_manager.get("TeqFw_Core_App_Db_Connector");
                db.init().then(function () {
                    console.log("AppInit: Database connection is created.");

                    const knex = db.get();
                    knex({main: "teq_core_user"}).select({id: "main.id", name: "main.name"}).then(
                        function (raw) {
                            const boo = raw;
                            for (const one of raw) {
                                console.log(`id: ${one.id}; name: ${one.name}`);
                            }
                            resolve();
                        }
                    );

                });
            });
        }

        /**
         * Register modules namespaces and path to sources into Object Manager.
         *
         * @return {Promise<void>}
         */
        function init_autoload() {
            return new Promise(function (resolve) {
                const autoload = require("./src/_init/autoload");
                autoload().then(resolve);
            });
        }

        /**
         * Create application's web server, run through the teq-modules list and configure server.
         *
         * @return {Promise<void>}
         */
        function init_server() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_App_Server */
                const web_server = global["teqfw"].object_manager.get("TeqFw_Core_App_Server");
                web_server.init().then(() => {
                    console.log("AppInit: Application Server is initialized.");
                    resolve();
                });
            });
        }

        /**
         * Call initialization for all teq-modules.
         *
         * @return {Promise<void>}
         */
        function init_modules() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_Di */
                const obm = global["teqfw"].object_manager;
                /** @type TeqFw_Core_App_Module_Initializer */
                const init = obm.get("TeqFw_Core_App_Module_Initializer");
                init.exec().then(resolve);
            });
        }

        /**
         * Parse CLI arguments and execute the called command or print out help by default.
         */
        function run_commander() {
            console.log("AppInit: Initialization is completed. Run requested command.");
            /** @type TeqFw_Core_App_Commander */
            const commander = global["teqfw"].object_manager.get("TeqFw_Core_App_Commander");
            commander.run();
        }

        /* This function actions. */
        _app = this;    // bind the application with `run()` scope
        create_globals()                // create `globals.teqfw` structure
            .then(create_main_objects)  // create object manager (Dependency Injection) and place it to `globals`
            .then(load_modules_defs)    // load modules definitions
            .then(init_autoload)        // populate Object Manager's autoload
            .then(init_modules)         // initialize teq-modules
            .then(init_db)              // initialize database connection
            .then(init_commander)       // initialize application commander
            .then(init_server)          // initialize application server
            .then(run_commander)        // run application's commander
            .catch((reason) => {
                console.log("Application fatal error: " + reason);
                throw reason;
            });
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App;