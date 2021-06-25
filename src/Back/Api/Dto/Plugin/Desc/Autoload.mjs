/**
 * DTO for 'autoload' node in plugin descriptor (teqfw.json).
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload';

// MODULE'S CLASSES
class TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload {
    /**
     * Extensions for ES6 sources (default: 'mjs').
     * @type {string}
     */
    ext = 'mjs';
    /**
     * Plugin's namespace ('Vendor_Project_Module').
     * @type {string}
     */
    ns;
    /**
     * Path to the root of sources relative to the root of the npm package.
     * @type {string}
     */
    path;
}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload
 */
class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload}
         */
        this.create = function (data = null) {
            const res = new TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload();
            res.ext = data?.ext;
            res.ns = data?.ns;
            res.path = data?.path;
            return res;
        }
    }
}

// freeze class to deny attributes changes then export class
Object.freeze(TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload);
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
export {
    TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload as default,
    Factory
} ;
