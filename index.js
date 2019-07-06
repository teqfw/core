"use strict";
const NS = "teqfw_core_all";


/** =============================================================================
 * Import.
 * =========================================================================== */
const commander = require("commander");
const path = require("path");

const obm = require("teqfw-core-di");
const mod_scanner = require("./src/modScanner");


/** =============================================================================
 * Definitions of working elements (constants, variables, functions).
 * =========================================================================== */
const teqfw = global["teqfw"];
const version = teqfw.cfg.version;

/**
 *
 * @returns {Readonly<{run: run}>}
 * @constructor
 */
function Construct() {
    let _commander = commander;
    _commander.version(version, "-v, --version");


    function commandAdd(spec) {
        let {flags, description, fnAction} = spec;
        _commander.option(flags, description, fnAction);
    }

    function run() {
        init(() => {
            _commander.parse(process.argv);
            if (!process.argv.slice(2).length) {
                const path_to_submodule = path.join(teqfw.cfg.path.root, "node_modules", "teqfw-core-server", "src", "subFolder", "subModule.js");
                const boo = require(path_to_submodule);
                console.log("BOO:" + boo.name);
                _commander.outputHelp();
            }
        });
    };

    function init(callback) {
        (function init_globals() {
            /* create structure for global container `teqfw` */
            teqfw.mod = {};
            teqfw.core = {};
        })();


        // scan all node_modules and compose list of TeqFW modules
        mod_scanner((modules_list) => {
            console.log("TeqFW modules: " + JSON.stringify(modules_list));

            // init modules
            const mod_server = require("teqfw-core-server");
            mod_server.init(result);

            callback();
        });

    }

    const result = Object.freeze({
        commandAdd,
        run
    });
    return result;
}


/** =============================================================================
 * Objects composition.
 * =========================================================================== */
const teqfw_core_app = new Construct();


/**
 * Module exports.
 * @public
 */
module.exports = teqfw_core_app;

