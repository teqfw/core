/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Config_Local';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Config_Local {
    /**
     * 'true' - application is in development mode.
     * @type {Boolean}
     */
    devMode;
    /**
     * Backend instance identifier. Random ID will be generated if omitted.
     * @type {string}
     */
    uuid;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Config_Local
 */
export class Factory {
    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castBoolean|function} */
        const castBoolean = spec['TeqFw_Core_Shared_Util_Cast.castBoolean'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Config_Local|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Config_Local}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Config_Local();
            res.devMode = castBoolean(data?.devMode);
            res.uuid = castString(data?.uuid);
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
