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
    if (obj1 === obj2) return true;
    else if (isPrimitive(obj1) && isPrimitive(obj2)) return (obj1 === obj2);
    else if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    // compare objects with same number of keys
    for (let key in obj1) {
        if (!(key in obj2)) return false; //other object doesn't have this prop
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
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

// finalize code components for this es6-module
Object.defineProperty(deepEqual, 'namespace', {value: NS});
Object.defineProperty(isPrimitive, 'namespace', {value: NS});

export {
    deepEqual,
    isPrimitive,
}
