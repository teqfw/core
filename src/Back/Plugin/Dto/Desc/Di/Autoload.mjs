/**
 * Structure for the '@teqfw/di/autoload' node of the descriptor (teqfw.json).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload
 */
class Dto {
    static namespace = NS;
    /**
     * Extension for files in the namespace ([js|mjs|es6...]).
     * @type {string}
     */
    ext;
    /**
     * Namespace with the ending separator ('Vnd_Prj_Plugin_').
     * @type {string}
     */
    ns;
    /**
     * Relative path to the root of the namespace to import sources ('./src').
     * @type {string}
     */
    path;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload {
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
         * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload.Dto} [data]
         * @returns {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // util.cast known attributes
            res.ext = cast.string(data?.ext);
            res.ns = cast.string(data?.ns);
            res.path = cast.string(data?.path);
            return res;
        };
    }
}