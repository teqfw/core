/**
 * Structure for the item of the '@teqfw/di/replace' node of the descriptor (teqfw.json).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace
 */
class Dto {
    static namespace = NS;
    /**
     * The object key to be replaced.
     * @type {string}
     */
    from;
    /**
     * Sphere of the replacement: front or back.
     * @type {string}
     * @see TeqFw_Core_Shared_Enum_Sphere
     */
    sphere;
    /**
     * The object key that replaces the original.
     * @type {string}
     */
    to;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace {
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
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace.Dto} [data]
         * @return {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // util.cast known attributes
            res.from = util.castString(data?.from);
            res.sphere = util.castString(data?.sphere);
            res.to = util.castString(data?.to);
            return res;
        };
    }
}