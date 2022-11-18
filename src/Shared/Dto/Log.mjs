/**
 * Log entry structure.
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_Shared_Dto_Log';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Core_Shared_Dto_Log
 */
class Dto {
    static namespace = NS;
    /** @type {Date} */
    date;
    /** @type {boolean} */
    isError;
    /** @type {string} */
    message;
    /** @type {Object} */
    meta;
    /** @type {string} */
    source;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_IDto
 */
export default class TeqFw_Core_Shared_Dto_Log {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Shared_Util_Cast.castDate|function} */
        const castDate = spec['TeqFw_Core_Shared_Util_Cast.castDate'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castBoolean|function} */
        const castBoolean = spec['TeqFw_Core_Shared_Util_Cast.castBoolean'];
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];
        /** @type {TeqFw_Core_Shared_Dto_Formless} */
        const dtoFormless = spec['TeqFw_Core_Shared_Dto_Formless$'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_Core_Shared_Dto_Log.Dto} [data]
         * @return {TeqFw_Core_Shared_Dto_Log.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date = castDate(data?.date);
            res.isError = castBoolean(data?.isError);
            res.message = castString(data?.message);
            res.meta = dtoFormless.createDto(data?.meta);
            res.source = castString(data?.source);
            return res;
        }
    }
}
