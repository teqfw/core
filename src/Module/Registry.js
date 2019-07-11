/**
 * Registry for teq-modules.
 *
 * @namespace TeqFw_Core_App_Module_Registry
 */
"use strict";

/** =============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");
const path = require("path");
/* project modules (from "node_modules"; sample: "express") */
/* module sources (from this module filesystem); "./folder/script" */

/** =============================================================================
 * TeqFW object composition.
 * =========================================================================== */
/**
 * Registry for teq-modules.
 *
 * @return {TeqFw_Core_App_Module_Registry}
 * @constructor
 */
function TeqFw_Core_App_Module_Registry() {
    /**
     * @typedef {Object} TeqFw_Core_App_Module_Registry.ModuleScanData
     * @property {string} path - Absolute path to module's root ("/.../app/node_modules/teqfw-core-di")
     * @property {Object} desc - teqfw-descriptor from `package.json`
     */

    /**
     * Registry for teq-modules definitions (see `teqfw` nodes in `package.json` files).
     *
     * @type {Map<string, ModuleScanData>}
     * @private
     */
    const _registry = new Map();


    /* Object methods (public) */
    this.loadModules = function () {
        return new Promise(function (resolve) {
            /** @type TeqFw_Core_Di */
            const obm = global["teqfw"].object_manager;
            /** @type TeqFw_Core_App_Config */
            const config = obm.get("TeqFw_Core_App_Config");
            const path_root = config.get("path/root");
            const dir_node_modules = path.join(path_root, "node_modules");
            // read all folders in `./node_modules/``
            fs.readdir(dir_node_modules, (err, dirs) => {
                if (err) throw err;
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
                                        const mod_def = package_json.teqfw;
                                        const package_name = package_json.name;
                                        /** @type TeqFw_Core_App.ModuleScanData */
                                        const desc = {path: dir_package, desc: mod_def};
                                        _registry.set(package_name, desc);
                                        // add module to Object Manager
                                        const path_src = path.join(dir_package, mod_def.autoload.path);
                                        /** @type {TeqFw_Core_Di.ModuleData} */
                                        const di_data = {
                                            ns: mod_def.autoload.ns,
                                            path: dir_package,
                                            src: path_src
                                        };
                                        obm.addModule({module: package_name, data: di_data});
                                        console.log(`ModRegistry: Module '${package_name}' is added to autoloader.`);
                                    }
                                    // return result if all folders in `./node_modules` were processed.
                                    if (itemsProcessed >= array.length) {
                                        const total = _registry.size;
                                        console.log(`AppInit: Definitions for '${total}' teq-modules are loaded.`);
                                        resolve();
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

    /** Object finalization (result) */
    const result = Object.freeze(this);
    return result;
}


/** =============================================================================
 * Module exports.
 * =========================================================================== */
module.exports = TeqFw_Core_App_Module_Registry;