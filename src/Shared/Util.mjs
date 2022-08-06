/**
 * Set of utilities to use on front and back.
 * @namespace TeqFw_Core_Shared_Util
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util';


/**
 * Convert ArrayBuffer to Base64 encoded string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function ab2b64(buf) {
    return self.btoa(ab2str(buf));
}


/**
 * Convert ArrayBuffer to HEX-string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 * @deprecated use TeqFw_Core_Shared_Util_Codec.ab2hex
 */
function ab2hex(buf) {
    return [...new Uint8Array(buf)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Convert ArrayBuffer to string.
 * @param {ArrayBuffer} buf
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 * @deprecated use TeqFw_Core_Shared_Util_Codec.ab2str
 */
function ab2str(buf) {
    return String.fromCharCode(...new Uint8Array(buf));
}

/**
 * Convert Base64 string to ArrayBuffer.
 * @param {string} base64
 * @return {ArrayBuffer}
 * @memberOf TeqFw_Core_Shared_Util
 */
function b642ab(base64) {
    return str2ab(self.atob(base64));
}

/**
 * Deep merge of the 2 objects.
 * Source: https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-2930530
 *
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 * @memberOf TeqFw_Core_Shared_Util
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

/**
 * Return 'true' if `val` is empty.
 * @param {*} val
 * @returns {boolean}
 * @memberOf TeqFw_Core_Shared_Util
 */
function isEmpty(val) {
    return (val === undefined) || (val === null) || (val === '');
}

/**
 * Return 'true' if `val` is Object (not array, function, null).
 * @param {*} val
 * @returns {boolean}
 * @memberOf TeqFw_Core_Shared_Util
 */
function isObject(val) {
    return (
        (typeof val === 'object') &&
        (!Array.isArray(val)) &&
        (val !== null)
    );
}

/**
 * Round number to 'places' decimals.
 *
 * (https://stackoverflow.com/a/19722641/4073821)
 *
 * @param {number} num
 * @param {number} places (integer)
 * @return {number}
 * @memberOf TeqFw_Core_Shared_Util
 */
function round(num, places = 2) {
    const norm = (typeof num === 'number') ? num : Number.parseFloat(num);
    return +(Math.round(norm + "e+" + places) + "e-" + places);
}

/**
 * Make object serializable (convert Proxy to clear Object).
 * @param {Object} obj
 * @return {Object}
 * @memberOf TeqFw_Core_Shared_Util
 */
function serializable(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Convert string to array buffer.
 * @param {string} str
 * @return {ArrayBuffer}
 * @memberOf TeqFw_Core_Shared_Util
 */
function str2ab(str) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) bufView[i] = str.charCodeAt(i);
    return buf;
}

// finalize code components for this es6-module
Object.defineProperty(ab2b64, 'namespace', {value: NS});
Object.defineProperty(ab2hex, 'namespace', {value: NS});
Object.defineProperty(ab2str, 'namespace', {value: NS});
Object.defineProperty(b642ab, 'namespace', {value: NS});
Object.defineProperty(deepMerge, 'namespace', {value: NS});
Object.defineProperty(isEmpty, 'namespace', {value: NS});
Object.defineProperty(isObject, 'namespace', {value: NS});
Object.defineProperty(round, 'namespace', {value: NS});
Object.defineProperty(serializable, 'namespace', {value: NS});
Object.defineProperty(str2ab, 'namespace', {value: NS});

export {
    ab2b64,
    ab2hex,
    ab2str,
    b642ab,
    deepMerge,
    isEmpty,
    isObject,
    round,
    serializable,
    str2ab,
};
