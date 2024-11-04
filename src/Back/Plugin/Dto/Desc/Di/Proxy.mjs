/**
 * Structure for the item of the '@teqfw/di/proxy' node of the descriptor (teqfw.json).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy
 */
class Dto {
    static namespace = NS;
    /**
     * The object key to be wrapped with a proxy.
     * @type {string}
     */
    from;
    /**
     * The sphere of the wrapping: front or back.
     * @type {string}
     * @see TeqFw_Core_Shared_Enum_Sphere
     */
    sphere;
    /**
     * The object key for the proxy object that wraps the original.
     * @type {string}
     */
    to;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {typeof TeqFw_Core_Shared_Enum_Sphere} SPHERE
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
            TeqFw_Core_Shared_Enum_Sphere$: SPHERE,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy.Dto} [data]
         * @returns {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // util.cast known attributes
            res.from = cast.string(data?.from);
            res.sphere = cast.enum(data?.sphere, SPHERE);
            res.to = cast.string(data?.to);
            return res;
        };
    }
}