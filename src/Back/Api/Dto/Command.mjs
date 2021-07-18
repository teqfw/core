/**
 * Data structure to add command to commander (@see TeqFw_Core_Back_App.init.initCommander.addCommand).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Command';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Command {
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
class Factory {
    constructor(spec) {
        /** @type {typeof TeqFw_Core_Back_Api_Dto_Command_Argument} */
        const DArg = spec['TeqFw_Core_Back_Api_Dto_Command_Argument#'];
        /** @type {TeqFw_Core_Back_Api_Dto_Command_Argument.Factory} */
        const fArg = spec['TeqFw_Core_Back_Api_Dto_Command_Argument#Factory$'];
        /** @type {typeof TeqFw_Core_Back_Api_Dto_Command_Option} */
        const DOpt = spec['TeqFw_Core_Back_Api_Dto_Command_Option#'];
        /** @type {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} */
        const fOpt = spec['TeqFw_Core_Back_Api_Dto_Command_Option#Factory$'];

        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command();
            res.action = data?.action;
            res.args = Array.isArray(data?.args)
                ? data.args.map((one) => (one instanceof DArg) ? one : fArg.create(one))
                : [];
            res.desc = data?.desc;
            res.name = data?.name;
            res.opts = Array.isArray(data?.opts)
                ? data.opts.map((one) => (one instanceof DOpt) ? one : fOpt.create(one))
                : [];
            res.realm = data?.realm;
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Command);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Command as default,
    Factory
} ;
