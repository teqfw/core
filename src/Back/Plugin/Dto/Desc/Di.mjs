/**
 * DTO to represent the plugin descriptor (teqfw.json) structure that is related to the '@teqfw/di' package.
 *
 * ATTENTION: This DTO is part of the '@teqfw/core' because '@teqfw/di' is a fundamental package for the framework
 * and cannot contain framework related code.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc_Di';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc_Di
 */
class Dto {
    static namespace = NS;
    /**
     * Namespace configuration of the teq-plugin for DI resolver.
     * @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload.Dto}
     */
    autoload;
    /**
     * Instructions to wrap objects in post-processing.
     * @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy.Dto[]}
     */
    proxy;
    /**
     * Replacements for object keys:
     * @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace.Dto[]}
     */
    replaces;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc_Di {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} util
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload} dtoAutoload
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace} dtoReplace
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: util,
            TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload$: dtoAutoload,
            TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace$: dtoReplace,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} [data]
         * @return {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.autoload = dtoAutoload.createDto(data?.autoload);
            res.replaces = util.castArrayOfObj(data?.replaces, dtoReplace.createDto);
            return res;
        };
    }
}