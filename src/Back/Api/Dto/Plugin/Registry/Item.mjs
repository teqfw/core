/**
 * Plugin registry item DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item {
    /**
     * Names of the dependencies (npm packages).
     * @type {string[]}
     */
    deps;
    /**
     * Name of the package.
     * @type {string}
     */
    name;
    /**
     * Path to the root of the package.
     * @type {string}
     */
    path;
    /**
     * 'teqfw.json' content of the package. We don't know exact structure for this object because plugins can
     * add own nodes to this JSON.
     * @type {Object}
     */
    teqfw;
}


/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item
 */
export class Factory {
    static namespace = NS;

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
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item();
            res.deps = util.castArray(data?.deps);
            res.name = util.castString(data?.name);
            res.path = util.castString(data?.path);
            res.teqfw = Object.assign({}, data?.teqfw); // make a copy
            return res;
        }
    }
}
