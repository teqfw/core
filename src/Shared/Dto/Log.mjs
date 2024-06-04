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
    /**
     * Namespace for message source.
     * @type {string}
     */
    source;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Core_Shared_Dto_Log {
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
         * @param {TeqFw_Core_Shared_Dto_Log.Dto} [data]
         * @return {TeqFw_Core_Shared_Dto_Log.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.date = cast.date(data?.date);
            res.isError = cast.boolean(data?.isError);
            res.message = cast.string(data?.message);
            res.meta = cast.object(data?.meta);
            res.source = cast.string(data?.source);
            return res;
        }
    }
}
