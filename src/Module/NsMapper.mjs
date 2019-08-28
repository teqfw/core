import $path from "path";

/**
 * Map TeqFW modules namespaces to file system in DI container.
 */
export default class TeqFw_Core_App_Module_NsMapper {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Logger} */
        const _logger = spec.TeqFw_Core_App_Logger$;
        /** @type {TeqFw_Core_App_Registry_Module} */
        const _mod_reg = spec.TeqFw_Core_App_Registry_Module$;
        /** @type {TeqFw_Di_Container} */
        const _di = spec.TeqFw_Di_Container$;

        /**
         * Get all modules from registry and map namespaces to filesystem in DI Container.
         *
         * @return {Promise<void>}
         * @memberOf TeqFw_Core_App_Module_NsMapper.prototype
         */
        this.exec = function () {
            return new Promise(function (resolve) {
                const mods = _mod_reg.get();
                for (const mod of mods) {
                    if (mod.desc && mod.desc.autoload) {
                        const path_root = mod.path.root;
                        const autoload = mod.desc.autoload;
                        const ns = autoload.ns;
                        const path_src = autoload.path;
                        const path = $path.join(path_root, path_src);
                        _di.addSourceMapping(ns, path);
                    }
                }
                resolve();
            });
        };
    }
}