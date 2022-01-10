/**
 * Formless DTO for unstructured objects. This DTO has no permanent structure.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Dto_Formless';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Dto_Formless
 */
class Dto {
    static namespace = `${NS}.Dto`;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class TeqFw_Core_Shared_Dto_Formless {
    constructor() {

        // DEFINE INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Dto_Formless.Dto} data
         * @return {TeqFw_Core_Shared_Dto_Formless.Dto}
         */
        this.createDto = function (data = null) {
            const obj = (typeof data === 'object') && (data !== null)
                ? JSON.parse(JSON.stringify(data))
                : {};
            return Object.assign(new Dto(), obj);
        }
    }
}
