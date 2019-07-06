/**
 * Application itself.
 *
 * @namespace TeqFw_Core_All
 */
"use strict";


/** =============================================================================
 * Import.
 * =========================================================================== */
const commander = require("commander");
const path = require("path");

const obm = new (require("teqfw-core-di"))();
const mod_scanner = require("./src/modScanner");


/** =============================================================================
 * Definitions of working elements (constants, variables, functions).
 * =========================================================================== */
const teqfw = global["teqfw"];
const version = teqfw.cfg.version;

/**
 * TeqFW application.
 *
 * @constructor
 */
function TeqFw_Core_All() {
    let _commander = commander;
    _commander.version(version, "-v, --version");

    this.commandAdd = function (spec) {
        let {flags, description, fnAction} = spec;
        _commander.option(flags, description, fnAction);
    };

    /**
     * Initialize application then run.
     */
    this.run = function () {
        init(init_callback);
    };

    const result = Object.freeze(this);

    /**
     * Application initialization is performed in the beginning (@see this.run).
     *
     * @private
     * @param callback
     */
    function init(callback) {
        (function init_globals() {
            /* create structure for global container `teqfw` */
            teqfw.object_manager = obm;
            teqfw.mod = {};
            teqfw.core = {};
        })();


        // scan all node_modules and compose list of TeqFW modules
        mod_scanner((modules_list) => {
            console.log("TeqFW modules: " + JSON.stringify(modules_list, null, "\t"));
            /** @type {TeqFw_Core_Di} */
            const obm = teqfw.object_manager;
            for (const module in modules_list) {
                const scan_data = modules_list[module];
                const path_src = path.join(scan_data.path, scan_data.desc.autoload.path);
                /** @type {TeqFw_Core_Di.ModuleData} */
                const di_data = {
                    ns: scan_data.desc.autoload.ns,
                    path: scan_data.path,
                    src: path_src
                };
                obm.addModule({module: module, data: di_data});
            }
            // init modules
            const mod_server = require("teqfw-core-server");
            mod_server.init(result);

            callback();
        });

    }

    function init_callback() {

        _commander.parse(process.argv);
        if (!process.argv.slice(2).length) {
            const path_to_submodule = path.join(teqfw.cfg.path.root, "node_modules", "teqfw-core-server", "src", "subFolder", "subModule.js");
            const boo = require(path_to_submodule);
            console.log("BOO:" + boo.name);
            _commander.outputHelp();
        }
    }

    return result;
}


/** =============================================================================
 * Objects composition.
 * =========================================================================== */

/**
 * Module exports.
 * @public
 */
module.exports = TeqFw_Core_All;

