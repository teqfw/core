/**
 * Data structure for command argument.
 * (@see node_modules/commander/lib/command.js:291 - Command.argument)
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command_Argument';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Command_Argument {
    /** @type {*} */
    defaultValue;
    /** @type {string} */
    description;
    /** @type {Function|*} */
    fn;
    /** @type {string} */
    name;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Command_Argument
 */
export class Factory {
    static namespace = NS;

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} util
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: util,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command_Argument|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command_Argument}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command_Argument();
            res.defaultValue = (typeof data?.defaultValue === 'object')
                ? JSON.parse(JSON.stringify(data.defaultValue)) // make a copy
                : util.castString(data.defaultValue);
            res.description = util.castString(data?.description);
            res.fn = util.castFunction(data?.fn);
            res.name = util.castString(data?.name);
            return res;
        }
    }
}
