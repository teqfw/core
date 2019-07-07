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
    /** Object properties (public & private) */

    let _commander = commander;
    _commander.version(version, "-v, --version");

    /** Object methods (private) */

    /**
     * Application initialization is performed in the beginning (@see this.run).
     *
     * @private
     * @param callback
     */
    function init(callback) {
        /** Function definitions */
        function initDi(modules_list) {
            /** @type {TeqFw_Core_Di} */
            const obm = teqfw.object_manager;
            for (const module of modules_list) {
                const name = module[0];
                const scan_data = module[1];
                const path_src = path.join(scan_data.path, scan_data.desc.autoload.path);
                /** @type {TeqFw_Core_Di.ModuleData} */
                const di_data = {
                    ns: scan_data.desc.autoload.ns,
                    path: scan_data.path,
                    src: path_src
                };
                obm.addModule({module: name, data: di_data});
            }
            callback();
        }

        /** Function process */
        // create structure for global container `teqfw`
        teqfw.object_manager = obm;
        teqfw.mod = {};
        teqfw.core = {};
        // scan all node_modules and compose list of TeqFW modules
        mod_scanner(initDi);
    }

    function runCommander() {
        _commander.parse(process.argv);
        if (!process.argv.slice(2).length) {
            _commander.outputHelp();
        }
    }

    /** Object methods (public) */

    this.commandAdd = function (spec) {
        let {flags, description, fnAction} = spec;
        _commander.option(flags, description, fnAction);
    };

    /**
     * Initialize application then run.
     */
    this.run = function () {
        init(() => {
            // TODO: move init modules section to separate code (we need to compose commander options only for beginning)
            const obj = obm.get("TeqFw_Core_Server_Sub_AnyClass");
            const obj2 = obm.get("TeqFw_Core_Server_Sub_AnyClass");
            obj.hello();
            obj2.boo = 4;
            const mod_server = obm.get("TeqFw_Core_Server");
            mod_server.init(result);
            runCommander();
        });
    };

    /** Object finalization (result) */
    const result = Object.freeze(this);
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

