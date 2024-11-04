/**
 * This DTO has no permanent structure and can contain any data.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Dto_Any';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Dto_Any
 */
class Dto {
    static namespace = NS;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Shared_Dto_Any {
    constructor() {

        // INSTANCE METHODS
        /**
         * @param {*} [data]
         * @returns {TeqFw_Core_Shared_Dto_Any.Dto}
         */
        this.createDto = function (data) {
            return Object.assign(new Dto(), data);
        }
    }
}
