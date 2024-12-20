/**
 * Local configuration DTO defines data structure being stored in './etc/local.json' for this plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Config_Local';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Config_Local
 */
class Dto {
    static namespace = NS;
    /**
     * 'true' - application is in development mode.
     * @type {boolean}
     */
    devMode;
    /**
     * Backend instance identifier. Random ID will be generated if omitted.
     * @type {string}
     */
    uuid;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Config_Local {
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
         * @param {TeqFw_Core_Back_Plugin_Dto_Config_Local.Dto} [data]
         * @returns {TeqFw_Core_Back_Plugin_Dto_Config_Local.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // util.cast known attributes
            res.devMode = cast.boolean(data?.devMode);
            res.uuid = cast.string(data?.uuid);
            return res;
        };
    }
}