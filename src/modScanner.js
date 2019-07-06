/**
 * Scan modules in `node_modules` and compose list of TeqFW modules.
 */
"use strict";
const NS = "teqfw_core_all_modScanner";


/** =============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");
const path = require("path");

/** =============================================================================
 * Definitions of working elements (constants, variables, functions).
 * =========================================================================== */
const teqfw = global["teqfw"];

function scan(callback) {
    const result = {};
    const dir_node_modules = path.join(teqfw.cfg.path.root, "node_modules");
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
                        fs.readFile(file_package, (err, rawdata) => {
                            itemsProcessed += 1;
                            if (err) throw err;
                            let package_json = JSON.parse(rawdata);
                            if (package_json.teqfw) {
                                const package_name = package_json.name;
                                // `teqfw` node means that module is TeqFW module
                                result[package_name] = {
                                    path: dir_package,
                                    desc: package_json.teqfw
                                };
                            }
                            if (itemsProcessed >= array.length) {
                                callback(result);
                            }
                        });
                    } else {
                        itemsProcessed += 1;
                    }
                }
            });
        });
    });
}

/** =============================================================================
 * Export
 * =========================================================================== */
module.exports = scan;