/**
 * Data structure for command option.
 * (@see node_modules/commander/lib/command.js:630 - Command.option)
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command_Option';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Command_Option {
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
export class Factory {
    static namespace = NS;

    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command_Option|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command_Option}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command_Option();
            res.defaultValue = (typeof data?.defaultValue === 'object')
                ? JSON.parse(JSON.stringify(data.defaultValue)) // make a copy
                : cast.string(data?.defaultValue);
            res.description = cast.string(data?.description);
            res.flags = cast.string(data?.flags);
            res.fn = cast.function(data?.fn);
            return res;
        }
    }
}
