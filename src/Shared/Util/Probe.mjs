/**
 * Utility functions to analyze data.
 * @namespace TeqFw_Core_Shared_Util_Probe
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Probe';

/**
 * Compare two variables for equivalence.
 *
 * https://stackoverflow.com/a/45683145/4073821
 *
 * @param {*} obj1
 * @param {*} obj2
 * @return {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Probe
 */
function deepEqual(obj1, obj2) {
    let res;
    if (obj1 === obj2) res = true;
    else if (isPrimitive(obj1) && isPrimitive(obj2)) res = (obj1 === obj2);
    else if ((obj1 === undefined) || (obj2 === undefined)) res = false;
    else if ((obj1 === null) || (obj2 === null)) res = false;
    else if (Object.keys(obj1).length !== Object.keys(obj2).length) res = false;
    else if (Array.isArray(obj1) && Array.isArray(obj2)) {
        res = true;
        for (let key in obj1) {
            if (!deepEqual(obj1[key], obj2[key])) {
                res = false;
                break;
            }
        }
    } else {
        res = true;
        // compare objects with same number of keys
        for (let key in obj1) {
            if (!(key in obj2)) {
                res = false; //other object doesn't have this prop
                break;
            }
            if (!deepEqual(obj1[key], obj2[key])) {
                res = false;
                break;
            }
        }
    }
    return res;
}

/**
 * Return 'true' if `val` is empty.
 * @param {*} val
 * @returns {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Probe
 */
function isEmpty(val) {
    return (val === undefined) || (val === null) || (val === '');
}

/**
 * Return 'true' if `val` is Object (not array, function, null).
 * @param {*} val
 * @returns {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Probe
 */
function isObject(val) {
    return (
        (typeof val === 'object') &&
        (!Array.isArray(val)) &&
        (val !== null)
    );
}

/**
 * Check if value is primitive.
 * @param {*} obj
 * @return {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Probe
 */
function isPrimitive(obj) {
    return (obj !== Object(obj));
}

/**
 * Make object serializable (convert Proxy to clear Object).
 * @param {Object} obj
 * @return {Object}
 * @memberOf TeqFw_Core_Shared_Util_Probe
 */
function serializable(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// finalize code components for this es6-module
Object.defineProperty(deepEqual, 'namespace', {value: NS});
Object.defineProperty(isEmpty, 'namespace', {value: NS});
Object.defineProperty(isObject, 'namespace', {value: NS});
Object.defineProperty(isPrimitive, 'namespace', {value: NS});
Object.defineProperty(serializable, 'namespace', {value: NS});

export {
    deepEqual,
    isEmpty,
    isObject,
    isPrimitive,
    serializable,
}
