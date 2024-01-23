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
     * @return {Array}
     */
    castArray(data) {
        return Array.isArray(data) ? [...data] : [];
    }

    /**
     * Cast input data into array of object using factory function.
     * @param {*} data
     * @param {function} [fact]
     * @return {Array}
     */
    castArrayOfObj(data, fact) {
        const defFunc = (a) => a ?? {}; // return input itself or empty Object
        const norm = (typeof fact === 'function') ? fact : defFunc;
        return Array.isArray(data)
            ? data.map((one) => norm(one))
            : [];
    }

    /**
     * Cast input data into array of strings.
     * @param {*} data
     * @return {Array}
     */
    castArrayOfStr(data) {
        return Array.isArray(data)
            ? data.map((one) => castString(one))
            : [];
    }

    /**
     * Cast input data into 'Uint8Array' data type.
     * @param {*} data
     * @return {Uint8Array}
     */
    castBin(data) {
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
     * @return {boolean}
     */
    castBoolean(data) {
        return this.boolean(data);
    }

    /**
     * Cast input data into 'boolean' data type if input defined.
     * @param {*} data
     * @return {boolean|undefined}
     */
    castBooleanIfExists(data) {
        return ((data === undefined) || (data === null)) ? data : castBoolean(data);
    }

    /**
     * Cast input data into 'boolean' data type if input defined.
     * @param {Date|string|number} data
     * @return {Date|undefined}
     */
    castDate(data) {
        return this.date(data);
    }

    /**
     * Cast input data into decimal 'number' data type.
     * @param {*} data
     * @return {number|undefined}
     */
    castDecimal(data) {
        const res = Number.parseFloat(data);
        return ((typeof res === 'number') && (!isNaN(res))) ? res : undefined;
    }

    /**
     * Cast input data into object value (enumerations).
     * @param {*} data
     * @param {Object} enu constant with allowable values
     * @param {boolean} capitalize 'true' - capitalize data before comparison
     * @return {string|undefined}
     */
    castEnum(data, enu, capitalize = true) {
        return this.enum(data, enu, capitalize);
    }

    /**
     * Cast input data into 'function' data type.
     * @param {*} data
     * @return {function|undefined}
     */
    castFunction(data) {
        if (typeof data === 'function') {
            return data;
        }
        return undefined;
    }

    /**
     * Cast input data into integer 'number' data type.
     * @param {*} data
     * @return {number|undefined}
     */
    castInt(data) {
        return this.int(data);
    }

    /**
     * Deep clone of the original object.
     * @param {Object} data
     * @return {Object}
     */
    castObject(data) {
        return this.object(data);
    }

    /**
     * Cast input data as a map (objects inside object).
     * @param {Object} data
     * @param {function} fact
     * @returns {Object<number|string, Object>}
     */
    castObjectsMap(data, fact) {
        return this.objectsMap(data, fact);
    }

    /**
     * Cast input data into some primitive type.
     * @param data
     * @return {undefined|string|number|boolean|symbol|bigint}
     */
    castPrimitive(data) {
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
     * Cast input data into 'string' data type.
     * @param {*} data
     * @return {string|undefined}
     */
    castString(data) {
        return this.string(data);
    }

    /**
     * Cast input data into 'boolean' data type.
     * @param {*} data
     * @return {boolean}
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
     * @param {Date|string|number} data
     * @return {Date|undefined}
     */
    date(data) {
        return ((typeof data === 'object') && (data instanceof Date)) ? new Date(data) :
            ((typeof data === 'string') || (typeof data === 'number')) ? new Date(data) : undefined;
    }

    /**
     * Cast input data into object value (enumerations).
     * @param {*} data
     * @param {Object} enu constant with allowable values
     * @param {boolean} capitalize 'true' - capitalize data before comparison
     * @return {string|undefined}
     */
    enum(data, enu, capitalize = true) {
        const values = Object.values(enu);
        const norm = (capitalize && (typeof data === 'string')) ? data.toUpperCase() : data;
        return values.includes(norm) ? norm : undefined;
    }

    /**
     * Cast input data into integer 'number' data type.
     * @param {*} data
     * @return {number|undefined}
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
     * @return {string|undefined}
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
const util = new TeqFw_Core_Shared_Util_Cast();

const castArray = util.castArray;
const castArrayOfObj = util.castArrayOfObj;
const castArrayOfStr = util.castArrayOfStr;
const castBin = util.castBin;
const castBoolean = util.boolean;
const castBooleanIfExists = util.castBooleanIfExists;
const castDate = util.date;
const castDecimal = util.castDecimal;
const castEnum = util.enum;
const castFunction = util.castFunction;
const castInt = util.int;
const castObject = util.object;
const castObjectsMap = util.objectsMap;
const castPrimitive = util.castPrimitive;
const castString = util.string;

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
