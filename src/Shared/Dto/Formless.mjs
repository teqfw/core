/**
 * Formless DTO for unstructured objects. This DTO has no permanent structure.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Dto_Formless';

/**
 * @memberOf TeqFw_Core_Shared_Dto_Formless
 * @type {Object}
 */
const ATTR = {};

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Dto_Formless
 */
class Dto {
    static name = `${NS}.Dto`;
}

/**
 * @implements TeqFw_Core_Shared_Api_Dto_IMeta
 */
export default class TeqFw_Core_Shared_Dto_Formless {
    constructor() {
        /**
         * @param {TeqFw_Core_Shared_Dto_Formless|string|null} data
         * @return {TeqFw_Core_Shared_Dto_Formless}
         */
        this.create = function (data = null) {
            const obj = (typeof data === 'object')
                ? data
                : (typeof data === 'string') ? JSON.parse(data) : {};
            return Object.assign(new TeqFw_Core_Shared_Dto_Formless(), obj);
        }
        // DEFINE INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Dto_Formless.Dto|string} data
         * @return {TeqFw_Core_Shared_Dto_Formless.Dto}
         */
        this.createDto = function (data = null) {
            const obj = (typeof data === 'object')
                ? data
                : (typeof data === 'string') ? JSON.parse(data) : {};
            return Object.assign(new Dto(), obj);
        }

        this.getAttributes = () => ATTR;

        this.getAttrNames = () => Object.values(ATTR);
    }
}

// finalize code components for this es6-module
Object.freeze(ATTR);
