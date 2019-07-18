"use strict";
const $fs = require("fs");
const $path = require("path");

/**
 * Get absolute paths to all `package.json` files from `node_modules/.../` folders.
 *
 * @return {Promise<Array>}
 */
function get_mods_defs(path_root) {
    return new Promise(function (resolve) {
        const result = [];
        const dir_node_modules = $path.join(path_root, "node_modules");
        // read all folders in `./node_modules/``
        $fs.readdir(dir_node_modules, (err, dirs) => {
            if (err) throw err;
            const total_dirs = dirs.length;
            if (total_dirs > 0) {
                let itemsProcessed = 0;
                dirs.forEach((item) => {
                    // read `package.json` for every module
                    const dir_package = $path.join(dir_node_modules, item);
                    const file_package = $path.join(dir_package, "package.json");
                    $fs.stat(file_package, (err, stats) => {
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

/**
 * Teq-modules definitions loader.
 *
 * @param {string} path_root Absolute path to the application root folder.
 * @return {Promise<Array>}
 */
module.exports = function (path_root) {
    return new Promise(function (resolve) {
        const result = [];
        get_mods_defs(path_root).then((mods) => {
            // definition for application itself
            const app_def = $path.join(path_root, "package.json");
            const all = [app_def].concat(mods);
            const total = all.length;
            let itemsProcessed = 0;
            all.forEach((file_package) => {
                // parse `package.json` and find `teqfw` node inside
                $fs.readFile(file_package, (err, raw_data) => {
                    itemsProcessed += 1;
                    if (err) throw err;
                    const str_data = raw_data.toString();
                    let package_json = JSON.parse(str_data);
                    // `teqfw` node means that module is TeqFW module
                    if (package_json.teqfw) {
                        // compose scan base data
                        const mod_def = package_json.teqfw;
                        const package_name = package_json.name;
                        const path_package = $path.join(file_package, "..");
                        /** @type TeqFw_Core_App_Module_Registry.ModuleScanData */
                        const scanData = {
                            name: package_name,
                            path: {root: path_package},
                            desc: mod_def
                        };
                        // add `pub` folders (if exist)
                        const path_pub = $path.join(path_package, "pub");
                        const stat = $fs.statSync(path_pub);
                        if (stat.isDirectory()) {
                            scanData.path.pub = path_pub;
                        }
                        result.push(scanData);
                        console.log(`AppInit: Teq-module '${package_name}' is added to the registry.`);
                    }
                    // return result if all `package.json` files were processed.
                    if (itemsProcessed >= total) {
                        const total = result.length;
                        console.log(`AppInit: Definitions for '${total}' teq-modules are loaded.`);
                        resolve(result);
                    }
                });
            });
        });

    });
};