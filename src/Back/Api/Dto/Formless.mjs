/**
 * Formless DTO for unstructured objects. This DTO has no permanent structure.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Back_Api_Dto_Formless';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Api_Dto_Formless {}

/**
 * Factory to create new DTO instances.
 * @memberOf TeqFw_Core_Back_Api_Dto_Formless
 */
export class Factory {
    constructor() {
        /**
         * @param {TeqFw_Core_Back_Api_Dto_Formless|string|null} data
         * @return {TeqFw_Core_Back_Api_Dto_Formless}
         */
        this.create = function (data = null) {
            const obj = (typeof data === 'object')
                ? JSON.parse(JSON.stringify(data)) // make a copy
                : (typeof data === 'string') ? JSON.parse(data) : {};
            return Object.assign(new TeqFw_Core_Back_Api_Dto_Formless(), obj);
        }
    }
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});
