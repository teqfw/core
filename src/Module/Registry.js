/**
 * Registry for teq-modules.
 *
 * @namespace TeqFw_Core_App_Module_Registry
 */
"use strict";

/* ==============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");
const path = require("path");
/* project modules (from "node_modules"; sample: "express") */
/* module sources (from this module filesystem); "./folder/script" */

/* ==============================================================================
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
    const FILE_PACKAGE = "package.json";
    const DIR_MODULES = "node_modules";

    /**
     * Registry for teq-modules definitions (see `teqfw` nodes in `package.json` files).
     *
     * @type {Map<string, ModuleScanData>}
     * @private
     */
    const _registry = new Map();


    /**
     * Scan `package.json` files (application & from node_modules) and save definitions in registry.
     *
     * @return {Promise<void>}
     */
    this.loadModules = function () {

        /** @type TeqFw_Core_Di */
        const obm = global["teqfw"].object_manager;
        /** @type TeqFw_Core_App_Config */
        const config = obm.get("TeqFw_Core_App_Config");
        const _path_root = config.get("path/root");

        /**
         * Get paths to all `package.json` from `node_modules`.
         *
         * @return {Promise<Array>}
         */
        function get_mods_defs() {
            return new Promise(function (resolve) {
                const result = [];
                const dir_node_modules = path.join(_path_root, DIR_MODULES);
                // read all folders in `./node_modules/``
                fs.readdir(dir_node_modules, (err, dirs) => {
                    if (err) throw err;
                    const total_dirs = dirs.length;
                    if (total_dirs > 0) {
                        let itemsProcessed = 0;
                        dirs.forEach((item) => {
                            // read `package.json` for every module
                            const dir_package = path.join(dir_node_modules, item);
                            const file_package = path.join(dir_package, FILE_PACKAGE);
                            fs.stat(file_package, (err, stats) => {
                                itemsProcessed += 1;
                                if (err) {
                                    // do nothing, just skip the folders w/o package.json
                                } else {
                                    if (stats.isFile()) {
                                        result.push(file_package);
                                    }
                                    if (itemsProcessed >= total_dirs) {
                                        // all modules are processed, return results
                                        resolve(result);
                                    }
                                }
                            });
                        });
                    } else {
                        // return empty array if there are no modules in `node_modules`
                        resolve(result);
                    }
                });
            });
        }

        return new Promise(function (resolve) {
            const app_def = path.join(_path_root, FILE_PACKAGE);

            get_mods_defs().then((mods_defs) => {
                const all = [app_def].concat(mods_defs);
                const total = all.length;
                let itemsProcessed = 0;
                all.forEach((file_package) => {
                    // parse `package.json` and find `teqfw` node inside
                    fs.readFile(file_package, (err, raw_data) => {
                        itemsProcessed += 1;
                        if (err) throw err;
                        let package_json = JSON.parse(raw_data);
                        // `teqfw` node means that module is TeqFW module
                        if (package_json.teqfw) {
                            const mod_def = package_json.teqfw;
                            const package_name = package_json.name;
                            const dir_package = path.join(file_package, "..");
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
                        // return result if all `package.json` files were processed.
                        if (itemsProcessed >= total) {
                            const total = _registry.size;
                            console.log(`AppInit: Definitions for '${total}' teq-modules are loaded.`);
                            resolve();
                        }
                    });
                });
            });

        });
    };

    /**
     * Get module data by name or get all modules.
     *
     * @param {string} mod_name
     * @return {Map<string, ModuleScanData>|ModuleScanData}
     */
    this.get = function (mod_name = undefined) {
        let result;
        if (mod_name) {
            result = _registry.get(mod_name);
        } else {
            result = _registry;
        }
        return result;
    };
    /** Object finalization (result) */
    return Object.freeze(this);
}


/** =============================================================================
 * Module exports.
 * =========================================================================== */
module.exports = TeqFw_Core_App_Module_Registry;