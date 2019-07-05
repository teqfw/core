"use strict";
const NS = "teqfw_core_all";


/** =============================================================================
 * Import.
 * =========================================================================== */
const commander = require("commander");
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

    function run() {
        init(() => {
            _commander.parse(process.argv);
            if (!process.argv.slice(2).length) {
                const boo = JSON.stringify(teqfw);
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

        const fnCliFoo = function () {
            console.log("Foo is here...");
        };
        // scan all node_modules and compose list of TeqFW modules
        mod_scanner((modules_list) => {
            console.log("TeqFW modules: " + JSON.stringify(modules_list));
            _commander.option("--foo", "command `Foo`", fnCliFoo);
            callback();
        });

    }

    return Object.freeze({
        run
    });
}


/** =============================================================================
 * Objects composition.
 * =========================================================================== */
const teqfw_core_all_app = new Construct();


/**
 * Module exports.
 * @public
 */
module.exports = teqfw_core_all_app;

