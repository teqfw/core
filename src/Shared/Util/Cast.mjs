/**
 * This is a set of utilities for type casting input data.
 * It belongs to the namespace TeqFw_Core_Shared_Util_Cast.
 */
// MODULE'S VARS
const ENCODER = new TextEncoder();

// MODULE'S CLASSES
export default class TeqFw_Core_Shared_Util_Cast {

    /**
     * Cast input data into array data type.
     * @param {*} data
     * @returns {Array}
     */
    array(data) {
        return Array.isArray(data) ? [...data] : [];
    }

    /**
     * Cast input data into array of object using factory function.
     * @param {*} data
     * @param {function} [fact]
     * @returns {Array}
     */
    arrayOfObj(data, fact) {
        const defFunc = (a) => a ?? {}; // return input itself or empty Object
        const norm = (typeof fact === 'function') ? fact : defFunc;
        return Array.isArray(data)
            ? data.map((one) => norm(one))
            : [];
    }

    /**
     * Cast input data into array of strings.
     * @param {*} data
     * @returns {Array}
     */
    arrayOfStr(data) {
        return Array.isArray(data)
            ? data.map((one) => castString(one))
            : [];
    }

    /**
     * Cast input data into 'Uint8Array' data type.
     * @param {*} data
     * @returns {Uint8Array}
     */
    bin(data) {
        if (typeof data === 'string') {
            return ENCODER.encode(data);
        } else if (data instanceof Uint8Array) {
            const res = new Uint8Array(data.length);
            res.set(data);
            return res;
        }
        return data;
    }

    /**
     * Cast input data into 'boolean' data type.
     * @param {*} data
     * @returns {boolean}
     */
    boolean(data) {
        if ((data === true)
            || ((typeof data === 'string')
                && (
                    (data.toLowerCase() === 'true')
                    || (data.toLowerCase() === 'yes')
                ))
            || ((typeof data === 'number') && (data !== 0))
        ) {
            return true;
        }
        return false;
    }

    /**
     * Cast input data into 'boolean' data type if input defined.
     * @param {*} data
     * @returns {boolean|undefined}
     */
    booleanIfExists(data) {
        return ((data === undefined) || (data === null)) ? data : castBoolean(data);
    }

    /**
     * Cast input data into 'boolean' data type if input defined.
     * @param {Date|string|number} data
     * @returns {Date|undefined}
     */
    date(data) {
        return ((typeof data === 'object') && (data instanceof Date)) ? new Date(data) :
            ((typeof data === 'string') || (typeof data === 'number')) ? new Date(data) : undefined;
    }

    /**
     * Cast input data into decimal 'number' data type.
     * @param {*} data
     * @returns {number|undefined}
     */
    decimal(data) {
        const res = Number.parseFloat(data);
        return ((typeof res === 'number') && (!isNaN(res))) ? res : undefined;
    }

    /**
     * Cast input data into 'function' data type.
     * @param {*} data
     * @returns {function|undefined}
     */
    function(data) {
        if (typeof data === 'function') {
            return data;
        }
        return undefined;
    }

    /**
     * Cast input data into some primitive type.
     * @param data
     * @returns {undefined|string|number|boolean|symbol|bigint}
     */
    primitive(data) {
        if (
            (typeof data === 'string')
            || (typeof data === 'number')
            || (typeof data === 'boolean')
            || (typeof data === 'symbol')
            || (typeof data === 'bigint')
            || (data === null)
        ) return data;
        return undefined;
    }

    /**
     * Cast input data into object value (enumerations).
     * @param {*} data
     * @param {Object} enu constant with allowable values
     * @param {boolean} capitalize 'true' - capitalize data before comparison
     * @returns {string|undefined}
     */
    enum(data, enu, capitalize = true) {
        const values = Object.values(enu);
        const norm = (capitalize && (typeof data === 'string')) ? data.toUpperCase() : data;
        return values.includes(norm) ? norm : undefined;
    }

    /**
     * Cast input data into integer 'number' data type.
     * @param {*} data
     * @returns {number|undefined}
     */
    int(data) {
        const norm = (typeof data === 'string') ? data.trim() : data;
        const res = Number.parseInt(norm);
        return ((typeof res === 'number') && (!isNaN(res))) ? res : undefined;
    }

    object(data) {
        return (typeof data === 'object') ? JSON.parse(JSON.stringify(data)) : {};
    }

    /**
     * Cast input data as a map (objects inside object).
     * @param {Object} data
     * @param {function} fact
     * @returns {Object<number|string, Object>}
     */
    objectsMap(data, fact) {
        const defFunc = (a) => a ?? {}; // return input itself or empty Object
        const norm = (typeof fact === 'function') ? fact : defFunc;
        const res = {};
        if ((typeof data === 'object') && (data !== null)) {
            for (const key of Object.keys(data)) res[key] = norm(data[key]);
        }
        return res;
    }

    /**
     * Cast input data into 'string' data type.
     * @param {*} data
     * @returns {string|undefined}
     */
    string(data) {
        if (typeof data === 'string') {
            return data;
        } else if (typeof data === 'number') {
            return String(data);
        } else if (typeof data === 'boolean') {
            return (data) ? 'true' : 'false';
        }
        return undefined;
    }
}

// MODULE'S MAIN

// this is the old approach (function based), use decomposition for `TeqFw_Core_Shared_Util_Cast$` singleton.

const castArray = TeqFw_Core_Shared_Util_Cast.prototype.castArray = TeqFw_Core_Shared_Util_Cast.prototype.array;
const castArrayOfObj = TeqFw_Core_Shared_Util_Cast.prototype.castArrayOfObj = TeqFw_Core_Shared_Util_Cast.prototype.arrayOfObj;
const castArrayOfStr = TeqFw_Core_Shared_Util_Cast.prototype.castArrayOfStr = TeqFw_Core_Shared_Util_Cast.prototype.arrayOfStr;
const castBin = TeqFw_Core_Shared_Util_Cast.prototype.castBin = TeqFw_Core_Shared_Util_Cast.prototype.bin;
const castBoolean = TeqFw_Core_Shared_Util_Cast.prototype.castBoolean = TeqFw_Core_Shared_Util_Cast.prototype.boolean;
const castBooleanIfExists = TeqFw_Core_Shared_Util_Cast.prototype.castBooleanIfExists = TeqFw_Core_Shared_Util_Cast.prototype.booleanIfExists;
const castDate = TeqFw_Core_Shared_Util_Cast.prototype.castDate = TeqFw_Core_Shared_Util_Cast.prototype.date;
const castDecimal = TeqFw_Core_Shared_Util_Cast.prototype.castDecimal = TeqFw_Core_Shared_Util_Cast.prototype.decimal;
const castEnum = TeqFw_Core_Shared_Util_Cast.prototype.castEnum = TeqFw_Core_Shared_Util_Cast.prototype.enum;
const castFunction = TeqFw_Core_Shared_Util_Cast.prototype.castFunction = TeqFw_Core_Shared_Util_Cast.prototype.function;
const castInt = TeqFw_Core_Shared_Util_Cast.prototype.castInt = TeqFw_Core_Shared_Util_Cast.prototype.int;
const castObject = TeqFw_Core_Shared_Util_Cast.prototype.castObject = TeqFw_Core_Shared_Util_Cast.prototype.object;
const castObjectsMap = TeqFw_Core_Shared_Util_Cast.prototype.castObjectsMap = TeqFw_Core_Shared_Util_Cast.prototype.objectsMap;
const castPrimitive = TeqFw_Core_Shared_Util_Cast.prototype.castPrimitive = TeqFw_Core_Shared_Util_Cast.prototype.primitive;
const castString = TeqFw_Core_Shared_Util_Cast.prototype.castString = TeqFw_Core_Shared_Util_Cast.prototype.string;

export {
    castArray,
    castArrayOfObj,
    castArrayOfStr,
    castBin,
    castBoolean,
    castBooleanIfExists,
    castDate,
    castDecimal,
    castEnum,
    castFunction,
    castInt,
    castObject,
    castObjectsMap,
    castPrimitive,
    castString,
};
