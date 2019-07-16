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
        function init_globals() {
            return new Promise(function (resolve) {
                global["teqfw"] = {};
                console.log("AppInit: `global.teqfw` object is created.");
                resolve();
            });
        }


        /**
         * Load teqfw-modules definitions and save map to function scope (_mod_defs).
         * Read all `./node_modules/.../package.json` and compose map of "name"=>"package.json/teqfw node".
         *
         * @return {Promise<void>}
         */
        function load_modules_defs() {
            return new Promise(function (resolve) {
                // direct load with `require` cause `object_manager` is not initiated yet
                /** @type TeqFw_Core_App_Module_Registry */
                const registry = new (require("./src/Module/Registry"))();
                global["teqfw"].object_manager.put("TeqFw_Core_App_Module_Registry", registry);
                // load modules and initialize `object_manager`
                registry.loadModules().then(resolve);
            });
        }

        /**
         * Create Object Manager, place Application object inside then place Object Manager into the global scope.
         *
         * @return {Promise<void>}
         */
        function init_di() {
            return new Promise(function (resolve) {
                /** @type TeqFw_Core_Di */
                const obm = new (require("teqfw-core-di"))();
                obm.put("TeqFw_Core_Di", obm);
                obm.put("TeqFw_Core_App", _app);
                global["teqfw"].object_manager = obm;
                console.log("AppInit: Object Manager is created.");
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
                const path_cfg_local = $path.join(_root, "cfg", "local.json");
                const cfg_init = {
                    path: {root: _root},
                    version: _version
                };
                // direct load with `require` cause `object_manager` is not initiated yet
                /** @type {TeqFw_Core_App_Configurator} */
                const config = new (require("./src/Configurator"))();
                config.init(cfg_init, path_cfg_local).then(() => {
                    global["teqfw"].object_manager.put("TeqFw_Core_App_Configurator", config);
                    console.log("AppInit: Configuration is created.");
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
         * Create application's web server, run through the teq-modules list and configure server.
         *
         * @return {Promise<void>}
         */
        function init_server() {
            return new Promise(function (resolve) {
                const web_server = global["teqfw"].object_manager.get("TeqFw_Core_Server");
                web_server.init().then(() => {
                    console.log("AppInit: Application Server is created.");
                    resolve();
                });
            });
        }

        /**
         * Call initialization for all teq-modules.
         *
         * @return {Promise<void>}
         */
        async function init_modules() {
            /** @type TeqFw_Core_Di */
            const obm = global["teqfw"].object_manager;
            /** @type TeqFw_Core_App_Module_Registry */
            const mod_reg = global["teqfw"].object_manager.get("TeqFw_Core_App_Module_Registry");
            const all = mod_reg.get();
            for (const one of all) {
                const name = one[0];
                const desc = one[1].desc;
                const ns = desc.autoload.ns;
                const obj_name = ns + "_Sys_App_Init";
                let mod_init_obj;
                try {
                    mod_init_obj = obm.get(obj_name);
                } catch (err) {
                    // do nothing if ..._Sys_App_Init object is not found for the module
                }
                if (mod_init_obj) {
                    await mod_init_obj.exec();
                    console.log(`AppInit: Module '${name}' is initialized.`);
                }
            }
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
        init_globals()                  // create `globals.teqfw` structure
            .then(init_di)              // create object manager (Dependency Injection) and place it to `globals`
            .then(create_config)        // create application config and put it into Object Manager
            .then(load_modules_defs)    // load modules definitions and populate Object Manager's autoload
            .then(init_commander)       // initialize application commander
            .then(init_server)          // initialize application server
            .then(init_modules)         // initialize teq-modules
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