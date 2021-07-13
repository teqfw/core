/**
 * Data structure for command option.
 * (@see node_modules/commander/lib/command.js:630 - Command.option)
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command_Option';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Command_Option {
    /** @type {*} */
    defaultValue;
    /** @type {string} */
    description;
    /** @type {string} */
    flags;
    /** @type {Function|*} */
    fn;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Command_Option
 */
class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command_Option|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command_Option}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command_Option();
            res.defaultValue = data?.defaultValue;
            res.description = data?.description;
            res.flags = data?.flags;
            res.fn = data?.fn;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Back_Api_Dto_Command_Option);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Command_Option as default,
    Factory
} ;