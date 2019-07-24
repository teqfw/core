"use strict";
const $path = require("path");

/**
 * Register teq-modules namespaces and path to sources into Object Manager.
 *
 * @return {Promise<void>}
 */
module.exports = function () {
    return new Promise(function (resolve) {
        /** @type TeqFw_Core_Di */
        const obm = global["teqfw"].object_manager;
        /** @type TeqFw_Core_App_Registry_Module */
        const registry = obm.get("TeqFw_Core_App_Registry_Module");
        const all = registry.get();
        /** @type {TeqFw_Core_App_Registry_Module.ModuleScanData} const */
        for (const one of all) {
            const name = one[0];
            const scan_data = one[1];
            const path_mod = scan_data.path.root;
            const autoload = scan_data.desc.autoload;
            const ns = autoload.ns;
            const path_autoload = autoload.path;
            const path_src = $path.join(path_mod, path_autoload);
            /** @type {TeqFw_Core_Di.ModuleData} */
            const di_data = {
                ns: ns,
                path: path_mod,
                src: path_src
            };
            obm.addModule({module: name, data: di_data});
            console.log(`Autoload: Module '${name}' is added to Object Manager.`);
        }
        resolve();
    });
};