/**
 * Scan modules in `node_modules` and compose list of TeqFW modules.
 */
"use strict";
const NS = "teqfw_core_all_modScanner";


/** =============================================================================
 * Import.
 * =========================================================================== */
const fs = require("fs");

/** =============================================================================
 * Definitions of working elements (constants, variables, functions).
 * =========================================================================== */
const teqfw = global["teqfw"];

function scan(callback) {
    const result = [];
    const dir_node_modules = teqfw.cfg.path.root + "/node_modules";
    // read all folders in `./node_modules/``
    fs.readdir(dir_node_modules, (err, dirs) => {
        if (err) throw err;
        let itemsProcessed = 0;
        dirs.forEach((item, index, array) => {
            // read `package.json` for every module
            const file_package = dir_node_modules + "/" + item + "/package.json";
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
                                // `teqfw` node means that module is TeqFW module
                                result.push(file_package);
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