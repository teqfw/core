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
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Command|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Command}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Command();
            res.action = data?.action;
            res.desc = data?.desc;
            res.name = data?.name;
            res.realm = data?.realm;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Back_Api_Dto_Command);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Command as default,
    Factory
} ;
