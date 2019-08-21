/**
 * Initializer for teq-modules (executes `..._Sys_App_Init` scripts).
 *
 * Don't confuse loader with loader.
 */
export default class TeqFw_Core_App_Module_Initializer {
    constructor(spec) {
        /** @type {TeqFw_Core_App_Logger} */
        const _logger = spec.TeqFw_Core_App_Logger;
        /** @type {TeqFw_Di_Container} */
        const container = spec.TeqFw_Di_Container;
        /** @type {TeqFw_Core_App_Registry_Module} */
        const _mod_reg = spec.TeqFw_Core_App_Registry_Module;
        /** @type {TeqFw_Core_App_Module_Initializer} */
        const _self = this;


        async function init_modules() {
            const all = _mod_reg.get();
            for (const one of all) {
                const name = one.name;
                const desc = one.desc;
                const ns = desc.autoload.ns;
                const obj_name = ns + "_Sys_App_Init";
                let mod_init_obj;
                try {
                    mod_init_obj = await container.get(obj_name);
                } catch (err) {
                    // do nothing if ..._Sys_App_Init object is not found for the module
                    _logger.error("Init error: " + err);
                }
                if (mod_init_obj) {
                    await mod_init_obj.exec();
                    _logger.info(`${_self.constructor.name}: Module '${name}' initialization is started.`);
                }
            }
        }

        /**
         * Get all modules from registry and initialize its.
         *
         * @return {Promise<void>}
         * @memberOf TeqFw_Core_App_Module_Initializer.prototype
         */
        this.exec = function () {
            return new Promise(function (resolve) {
                init_modules()
                    .then(resolve);
            });
        };

    }
}