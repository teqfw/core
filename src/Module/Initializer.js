"use strict";

/**
 * Application registry for teq-modules.
 *
 * @param {TeqFw_Core_Di} TeqFw_Core_Di
 * @param {TeqFw_Core_App_Module_Registry} TeqFw_Core_App_Module_Registry
 * @return {TeqFw_Core_App_Module_Initializer}
 * @constructor
 */
function TeqFw_Core_App_Module_Initializer(
    TeqFw_Core_Di,
    TeqFw_Core_App_Module_Registry
) {
    const _obm = TeqFw_Core_Di;
    const _mod_reg = TeqFw_Core_App_Module_Registry;
    const _self = this;


    async function init_modules() {
        const all = _mod_reg.get();
        for (const one of all) {
            const name = one[0];
            const desc = one[1].desc;
            const ns = desc.autoload.ns;
            const obj_name = ns + "_Sys_App_Init";
            let mod_init_obj;
            try {
                mod_init_obj = _obm.get(obj_name);
            } catch (err) {
                // do nothing if ..._Sys_App_Init object is not found for the module
                console.log("Init error: " + err);
            }
            if (mod_init_obj) {
                await mod_init_obj.exec();
                console.log(`${_self.constructor.name}: Module '${name}' initialization is started.`);
            }
        }
    }

    /**
     * Get all modules from registry and initialize its.
     *
     * @return {Promise<void>}
     */
    this.exec = function () {
        return new Promise(function (resolve) {
            init_modules()
                .then(resolve);
        });
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Module_Initializer;