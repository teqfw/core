/**
 * Plugin registry item DTO.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item {
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
class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item();
            res.deps = Array.isArray(data?.deps) ? data.deps : [];
            res.name = data?.name;
            res.path = data?.path;
            res.teqfw = data?.teqfw;
            return res;
        }
    }
}

// finalize code components for this es6-module
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item as default,
    Factory
} ;
