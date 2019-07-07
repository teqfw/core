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

/**
 * TeqFW application.
 *
 * @constructor
 */
function TeqFw_Core_All() {
    /** Object properties (public & private) */

    const _commander = commander;
    _commander.version(teqfw.cfg.version, "-v, --version");

    /** Object methods (private) */

    /**
     * Application initialization is performed in the beginning from this.run().
     *
     * @return {Promise<any>}
     */
    function init() {
        return new Promise(function (resolve) {
            // create structure for global container `teqfw`
            teqfw.object_manager = obm;
            teqfw.mod = {};
            teqfw.core = {};
            // scan all node_modules and compose list of TeqFW modules
            mod_scanner()
                .then(initDi)
                .then(initCommander)
                .then(resolve);
        });
    }

    function initCommander() {
        return new Promise(function (resolve) {
            const mod_server = obm.get("TeqFw_Core_Server");
            /* get result from closure */
            mod_server.init(result).then(resolve);
        });
    }

    /**
     *
     * @param modules_list
     * @return {Promise<null>}
     */
    function initDi(modules_list) {
        return new Promise(function (resolve) {
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
            resolve();
        });
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
        init().then(runCommander);
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

