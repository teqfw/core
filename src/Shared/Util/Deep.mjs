/**
 * This is a set of pure functions to process some objects in the deep.
 */

// MODULE'S FUNCS

/**
 * Compare two variables for equivalence.
 *
 * https://stackoverflow.com/a/45683145/4073821
 *
 * @param {*} obj1
 * @param {*} obj2
 * @returns {boolean}
 * @memberOf TeqFw_Core_Shared_Util_Deep
 */
function deepEqual(obj1, obj2) {
    // FUNCS
    /**
     * Check if value is primitive.
     * @param {*} obj
     * @returns {boolean}
     * @memberOf TeqFw_Core_Shared_Util_Probe
     */
    function isPrimitive(obj) {
        return (obj !== Object(obj));
    }

    // MAIN
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
 * Example from MDN.
 * @param {Object} obj
 * @returns {Object}
 * @memberOf TeqFw_Core_Shared_Util_Deep
 */
function deepFreeze(obj) {
    const propNames = Reflect.ownKeys(obj);
    for (const name of propNames) {
        const value = obj[name];
        if ((value && typeof value === 'object') || typeof value === 'function') deepFreeze(value);
    }
    return Object.freeze(obj);
}


/**
 * Deep merge of the 2 objects.
 * Source: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530
 *
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 * @memberOf TeqFw_Core_Shared_Util_Deep
 */
function deepMerge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source)) {
        return source;
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge(Object.assign({}, targetValue), sourceValue);
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
}


// MODULE'S CLASSES
export default class TeqFw_Core_Shared_Util_Deep {

    constructor() {

        /**
         * Compare two variables for equivalence.
         *
         * https://stackoverflow.com/a/45683145/4073821
         *
         * @param {*} obj1
         * @param {*} obj2
         * @returns {boolean}
         * @memberOf TeqFw_Core_Shared_Util_Deep
         */
        this.equal = deepEqual;

        /**
         * Example from MDN.
         * @param {Object} obj
         * @returns {Object}
         * @memberOf TeqFw_Core_Shared_Util_Deep
         */
        this.freeze = deepFreeze;

        /**
         * Deep merge of the 2 objects.
         * Source: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530
         *
         * @param {Object} target
         * @param {Object} source
         * @returns {Object}
         * @memberOf TeqFw_Core_Shared_Util_Deep
         */
        this.merge = deepMerge;

    }
}
