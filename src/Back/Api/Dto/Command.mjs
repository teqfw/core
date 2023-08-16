/**
 * Data structure to add command to commander (@see TeqFw_Core_Back_App.init.initCommander.addCommand).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Command {
    /**
     * Commander action (@see https://www.npmjs.com/package/commander#commands).
     *  @type {Function}
     */
    action;
    /**
     * @type {TeqFw_Core_Back_Api_Dto_Command_Argument[]}
     */
    args;
    /**
     * Command description: 'Get version of the application.'
     * @type {string}
     */
    desc;
    /**
     * Command name: 'version'
     * @type {string}
     */
    name;
    /**
     * @type {TeqFw_Core_Back_Api_Dto_Command_Option[]}
     */
    opts;
    /**
     * Plugin's realm to compose full name for the command: 'core' => 'core-version'
     * @type {string}
     */
    realm;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Command
 */
export class Factory {
    static namespace = NS;

    /**
     *
     * @param {function} castArrayOfObj
     * @param {function} castFunction
     * @param {function} castString
     * @param {TeqFw_Core_Back_Api_Dto_Command_Argument.Factory} fArg
     * @param {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} fOpt
     */
    constructor(
        {
            ['TeqFw_Core_Shared_Util_Cast.castArrayOfObj']: castArrayOfObj,
            ['TeqFw_Core_Shared_Util_Cast.castFunction']: castFunction,
            ['TeqFw_Core_Shared_Util_Cast.castString']: castString,
            ['TeqFw_Core_Back_Api_Dto_Command_Argument.Factory$']: fArg,
            ['TeqFw_Core_Back_Api_Dto_Command_Option.Factory$']: fOpt,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command();
            res.action = castFunction(data?.action);
            res.args = castArrayOfObj(data?.args, fArg.create);
            res.desc = castString(data?.desc);
            res.name = castString(data?.name);
            res.opts = castArrayOfObj(data?.opts, fOpt.create);
            res.realm = castString(data?.realm);
            return res;
        }
    }
}
