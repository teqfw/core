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
            // TODO: move init modules section to separate code (we need to compose commander options only for beginning)
            const mod_server = require("teqfw-core-server");
            mod_server.init(result);

            /** TMP CODE */
            const server = obm.get("TeqFw_Core_Server");

            function Flancer32_Ntd_Downline_Controller(
                Flancer32_Ntd_Downline_Referral_Processor
            ) {
                const processor = Flancer32_Ntd_Downline_Referral_Processor;
const constructor = require("/home/alex/work/app/node_modules/fl32-ntd-dwnl/src/Referral/Processor.js");
const obj = new constructor();
            }

            /** End of TMP CODE */

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
        init(runCommander);
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

