/**
 * DTO to represent plugin descriptor (teqfw.json) structure that is related to 'core' plugin.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc
 */
class Dto {
    static namespace = NS;
    /**
     * List of modules with CLI commands.
     * @type {string[]}
     */
    commands;
    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Plugin.Dto} */
    plugin;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Plugin} dtoPlugin
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            TeqFw_Core_Back_Plugin_Dto_Desc_Plugin$: dtoPlugin,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc.Dto} [data]
         * @return {TeqFw_Core_Back_Plugin_Dto_Desc.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.commands = cast.arrayOfStr(data?.commands);
            res.plugin = dtoPlugin.createDto(data?.plugin);
            return res;
        }
    }
}