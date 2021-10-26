/**
 * Set of utilities for type casting of input data.
 * @namespace TeqFw_Core_Shared_Util_Cast
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Cast';

// MODULE'S FUNCTIONS
/**
 * Cast input data into array data type.
 * @param {*} data
 * @return {Array}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castArray(data) {
    return Array.isArray(data) ? [...data] : [];
}

/**
 * Cast input data into array of object using factory function.
 * @param {*} data
 * @param {function} fact
 * @return {Array}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castArrayOfObj(data, fact) {
    return Array.isArray(data)
        ? data.map((one) => fact(one))
        : [];
}

/**
 * Cast input data into array of strings.
 * @param {*} data
 * @return {Array}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castArrayOfStr(data) {
    return Array.isArray(data)
        ? data.map((one) => castString(one))
        : [];
}

/**
 * Cast input data into 'boolean' data type.
 * @param {*} data
 * @return {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castBoolean(data) {
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
 * @return {boolean|undefined}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castBooleanIfExists(data) {
    return (data === undefined) ? data : castBoolean(data);
}

/**
 * Cast input data into object value (enumerations).
 * @param {*} data
 * @param {Object} enu constant with allowable values
 * @return {string|undefined}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castEnum(data, enu) {
    const values = Object.values(enu);
    return values.includes(data) ? data : undefined;
}

/**
 * Cast input data into 'function' data type.
 * @param {*} data
 * @return {function|undefined}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castFunction(data) {
    if (typeof data === 'function') {
        return data;
    }
    return undefined;
}

/**
 * Cast input data into integer 'number' data type.
 * @param {*} data
 * @return {number|undefined}
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castInt(data) {
    const res = Number.parseInt(data);
    return ((typeof res === 'number') && (!isNaN(res))) ? res : undefined;
}

/**
 * Cast input data into some primitive type.
 * @param data
 * @return {undefined|string|number|boolean|symbol|bigint}
 */
function castPrimitive(data) {
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
 * @memberOf TeqFw_Core_Shared_Util_Cast
 */
function castString(data) {
    if (typeof data === 'string') {
        return data;
    } else if (typeof data === 'number') {
        return String(data);
    } else if (typeof data === 'boolean') {
        return (data) ? 'true' : 'false';
    }
    return undefined;
}

// MODULE'S FUNCTIONALITY
// finalize code components for this es6-module
Object.defineProperty(castArray, 'name', {value: `${NS}.${castArray.name}`});
Object.defineProperty(castArrayOfObj, 'name', {value: `${NS}.${castArrayOfObj.name}`});
Object.defineProperty(castBoolean, 'name', {value: `${NS}.${castBoolean.name}`});
Object.defineProperty(castBooleanIfExists, 'name', {value: `${NS}.${castBooleanIfExists.name}`});
Object.defineProperty(castEnum, 'name', {value: `${NS}.${castEnum.name}`});
Object.defineProperty(castFunction, 'name', {value: `${NS}.${castFunction.name}`});
Object.defineProperty(castInt, 'name', {value: `${NS}.${castInt.name}`});
Object.defineProperty(castPrimitive, 'name', {value: `${NS}.${castPrimitive.name}`});
Object.defineProperty(castString, 'name', {value: `${NS}.${castString.name}`});

export {
    castArray,
    castArrayOfObj,
    castArrayOfStr,
    castBoolean,
    castBooleanIfExists,
    castEnum,
    castFunction,
    castInt,
    castPrimitive,
    castString,
};
