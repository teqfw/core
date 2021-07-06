/**
 * DTO to represent plugin descriptor (teqfw.json) structure that is related to 'core' plugin.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Desc';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Plugin_Desc {
    /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload} */
    autoload;
    /** @type {string[]} */
    commands;
}

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_Plugin_Desc.AUTOLOAD = 'autoload';
TeqFw_Core_Back_Api_Dto_Plugin_Desc.COMMANDS = 'commands';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc
 */
class Factory {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {typeof TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload} */
        const DAutoload = spec['TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload#'];
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload.Factory} */
        const fAutoload = spec['TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload#Factory$']; // singleton

        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc();
            res.autoload = (data?.autoload instanceof DAutoload) ? data.autoload : fAutoload.create(data?.autoload);
            res.commands = Array.isArray(data?.commands) ? data.commands : [];
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Plugin_Desc as default,
    Factory
} ;
