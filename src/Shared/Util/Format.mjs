/**
 * Formatting functions.
 * @namespace TeqFw_Core_Shared_Util_Format
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Format';

/**
 * Convert local date to YYYY/MM/DD.
 * @param {Date|string|null} dateIn
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function date(dateIn = null) {
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
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function dateTime(dateIn = null, withSeconds = true) {
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
 * Convert date as UTC to MM/DD HH:MM:SS.
 * @param {Date} [date]
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function dateTimeForLog(date) {
    if ((date === undefined) || (date === null)) date = new Date();
    const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const d = `${date.getUTCDate()}`.padStart(2, '0');
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    const ms = `${date.getUTCMilliseconds()}`.padStart(3, '0');
    return `${m}/${d} ${h}:${i}:${s}.${ms}`;
}

/**
 * Convert local time to HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @param {boolean} withSeconds
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function time(dateIn = null, withSeconds = true) {
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
 * Convert seconds (integer) into 'mm:ss' format
 * @param {number|string} seconds
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function timeInSec(seconds) {
    const norm = Number.parseInt(seconds);
    const sec = norm % 60;
    const minWoSec = Math.floor(norm / 60);
    const min = minWoSec % 60;
    const m = `${min}`.padStart(2, '0');
    const s = `${sec}`.padStart(2, '0');
    return `${m}:${s}`;
}

/**
 * Convert UTC time to HH:MM:SS.
 * @param {Date|string|null} dateIn
 * @param {boolean} withSeconds
 * @returns {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function timeUtc(dateIn = null, withSeconds = true) {
    /** @type {Date} */
    const date = (dateIn) ?
        (dateIn instanceof Date) ? dateIn : new Date(dateIn) :
        new Date();
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    return (withSeconds) ? `${h}:${i}:${s}` : `${h}:${i}`;
}


// finalize code components for this es6-module
Object.defineProperty(date, 'namespace', {value: NS});
Object.defineProperty(dateTime, 'namespace', {value: NS});
Object.defineProperty(dateTimeForLog, 'namespace', {value: NS});
Object.defineProperty(time, 'namespace', {value: NS});
Object.defineProperty(timeInSec, 'namespace', {value: NS});
Object.defineProperty(timeUtc, 'namespace', {value: NS});

export {
    date,
    dateTime,
    dateTimeForLog,
    time,
    timeInSec,
    timeUtc,
};
