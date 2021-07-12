/**
 * Application bootstrap configuration DTO to use in backend code.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_App_Boot';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_App_Boot {
    /**
     * Absolute path to the root folder of the project.
     *
     * @type {string}
     */
    projectRoot;
    /**
     * Current version of the application (`0.1.0`).
     *
     * @type {string}
     */
    version;
}

// attributes names to use as aliases in queries to object props
TeqFw_Core_Back_Api_Dto_App_Boot.PROJECT_ROOT = 'projectRoot';
TeqFw_Core_Back_Api_Dto_App_Boot.VERSION = 'version';

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_App_Boot
 */
export class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_App_Boot|null} data
         * @return {TeqFw_Core_Back_Api_Dto_App_Boot}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_App_Boot();
            res.projectRoot = data?.projectRoot;
            res.version = data?.version;
            return res;
        }
    }
}

// freeze class to deny attributes changes
Object.freeze(TeqFw_Core_Back_Api_Dto_App_Boot);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

