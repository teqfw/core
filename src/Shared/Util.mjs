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
 * Convert local date to YYYY/MM/DD.
 * @param {Date|string|null} dateIn
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatDate(dateIn = null) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    return `${y}/${m}/${d}`;
}

/**
 * Convert local date to YYYY/MM/DD HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @param {boolean} withSeconds
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatDateTime(dateIn = null, withSeconds = true) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, '0');
    const d = `${date.getDate()}`.padStart(2, '0');
    const h = `${date.getHours()}`.padStart(2, '0');
    const i = `${date.getMinutes()}`.padStart(2, '0');
    const s = `${date.getSeconds()}`.padStart(2, '0');
    const time = (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
    return `${y}/${m}/${d} ${time}`;
}

/**
 * Convert local time to HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @param {boolean} withSeconds
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatTime(dateIn = null, withSeconds = true) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const h = `${date.getHours()}`.padStart(2, '0');
    const i = `${date.getMinutes()}`.padStart(2, '0');
    const s = `${date.getSeconds()}`.padStart(2, '0');
    return (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
}

/**
 * Convert UTC date to YYYY/MM/DD.
 * @param {Date|string|null} dateIn
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatUtcDate(dateIn = null) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const y = date.getUTCFullYear();
    const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const d = `${date.getUTCDate()}`.padStart(2, '0');
    return `${y}/${m}/${d}`;
}

/**
 * Convert input to 'X.XX CUR'.
 *
 * @param {number} amount
 * @param {string|null} cur
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatAmount(amount, cur = null) {
    const normAmnt = round(amount);
    const normCur = (typeof cur === 'string') ? cur : '';
    return `${normAmnt.toFixed(2)} ${normCur.toUpperCase()}`
}

/**
 * Convert UTC date to YYYY/MM/DD HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatUtcDateTime(dateIn = null) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const y = date.getUTCFullYear();
    const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const d = `${date.getUTCDate()}`.padStart(2, '0');
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    return `${y}/${m}/${d} ${h}:${i}:${s}`;
}

/**
 * Convert UTC time to HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util
 */
function formatUtcTime(dateIn = null) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    return `${h}:${i}:${s}`;
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
 * Parse some data as boolean or use default value.
 * @param {*} data
 * @param def
 * @return {boolean}
 * @memberOf TeqFw_Core_Shared_Util
 */
function parseBoolean(data, def = false) {
    let result = def;
    if (
        (data === true) ||
        ((typeof data === 'string') && (
            (data.toLowerCase() === 'true') ||
            (data.toLowerCase() === 'yes')
        )) ||
        ((typeof data === 'number') && (
            (data !== 0)
        ))
    ) {
        result = true;
    } else if (
        (data === false) ||
        ((typeof data === 'string') && (
            (data.toLowerCase() === 'false') ||
            (data.toLowerCase() === 'no')
        )) ||
        ((typeof data === 'number') && (
            (data === 0)
        ))
    ) {
        result = false;
    }
    return result;
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
Object.defineProperty(ab2b64, 'name', {value: `${NS}.${ab2b64.name}`});
Object.defineProperty(ab2hex, 'name', {value: `${NS}.${ab2hex.name}`});
Object.defineProperty(ab2str, 'name', {value: `${NS}.${ab2str.name}`});
Object.defineProperty(b642ab, 'name', {value: `${NS}.${b642ab.name}`});
Object.defineProperty(deepMerge, 'name', {value: `${NS}.${deepMerge.name}`});
Object.defineProperty(formatAmount, 'name', {value: `${NS}.${formatAmount.name}`});
Object.defineProperty(formatDate, 'name', {value: `${NS}.${formatDate.name}`});
Object.defineProperty(formatDateTime, 'name', {value: `${NS}.${formatDateTime.name}`});
Object.defineProperty(formatTime, 'name', {value: `${NS}.${formatTime.name}`});
Object.defineProperty(formatUtcDate, 'name', {value: `${NS}.${formatUtcDate.name}`});
Object.defineProperty(formatUtcDateTime, 'name', {value: `${NS}.${formatUtcDateTime.name}`});
Object.defineProperty(formatUtcTime, 'name', {value: `${NS}.${formatUtcTime.name}`});
Object.defineProperty(isEmpty, 'name', {value: `${NS}.${isEmpty.name}`});
Object.defineProperty(isObject, 'name', {value: `${NS}.${isObject.name}`});
Object.defineProperty(parseBoolean, 'name', {value: `${NS}.${parseBoolean.name}`});
Object.defineProperty(round, 'name', {value: `${NS}.${round.name}`});
Object.defineProperty(str2ab, 'name', {value: `${NS}.${str2ab.name}`});

export {
    ab2b64,
    ab2hex,
    ab2str,
    b642ab,
    deepMerge,
    formatAmount,
    formatDate,
    formatDateTime,
    formatTime,
    formatUtcDate,
    formatUtcDateTime,
    formatUtcTime,
    isEmpty,
    isObject,
    parseBoolean,
    round,
    str2ab,
};
