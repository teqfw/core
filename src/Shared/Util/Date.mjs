/**
 * Date manipulation functions.
 * @namespace TeqFw_Core_Shared_Util_Date
 */
// MODULE'S IMPORT
import {castDate} from './Cast.mjs';

// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Date';

/**
 * Add days to given date or to now.
 * @param {number} days
 * @param {Date} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addDays(days, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setDate(res.getDate() + Math.abs(days));
    return res;
}

/**
 * Add minutes to given date or to now.
 * @param {number} minutes
 * @param {Date} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addMinutes(minutes, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setMinutes(res.getMinutes() + Math.abs(minutes));
    return res;
}

/**
 * Add months to given date or to now.
 * @param {number} months
 * @param {Date} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addMonths(months, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setMonth(res.getMonth() + Math.abs(months));
    return res;
}

/**
 * Get first date of the month (UTC). Time is 00:00:00.
 * @param {Date|string|number} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function monthDayFirst(date) {
    const d = castDate(date ?? new Date());
    const res = new Date(0);
    res.setUTCFullYear(d.getUTCFullYear());
    res.setUTCMonth(d.getUTCMonth());
    res.setUTCDate(1);
    return res;
}

/**
 * Get the last date of the month (UTC). Time is 00:00:00.
 * @param {Date|string|number} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function monthDayLast(date) {
    const d = castDate(date ?? new Date());
    const res = new Date(0);
    res.setUTCFullYear(d.getUTCFullYear());
    res.setUTCMonth(d.getUTCMonth() + 1);
    res.setUTCDate(0);
    return res;
}

/**
 * Get first date of the next month (UTC). Time is 00:00:00.
 * @param {Date|string|number} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function nextMonthDayFirst(date) {
    const res = monthDayFirst(date);
    res.setUTCMonth(res.getUTCMonth() + 1);
    return res;
}

/**
 * Parse string representation of a date (2023/01/31) as UTC date (Tue Jan 31 2023 00:00:00 GMT+0000).
 * @param {string} date
 * @returns {Date} UTC date
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function parseAsUtc(date) {
    const loc = new Date(date); // Tue Jan 31 2023 00:00:00 GMT+0200
    const utc = new Date(0);
    utc.setUTCFullYear(loc.getFullYear(), loc.getMonth(), loc.getDate());
    utc.setUTCHours(loc.getHours(), loc.getMinutes(), loc.getSeconds());
    utc.setUTCMilliseconds(loc.getMilliseconds());
    return utc; // Tue Jan 31 2023 00:00:00 GMT+0000
}

/**
 * Subtract days from given date or from now.
 * @param {number} days
 * @param {Date} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function subtractDays(days, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setDate(res.getDate() - Math.abs(days));
    return res;
}

/**
 * Subtract minutes from given date or from now.
 * @param {number} minutes
 * @param {Date} [date]
 * @returns {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function subtractMinutes(minutes, date) {
    const res = (date instanceof Date) ? new Date(date) : new Date();
    res.setMinutes(res.getMinutes() - Math.abs(minutes));
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(addDays, 'namespace', {value: NS});
Object.defineProperty(addMinutes, 'namespace', {value: NS});
Object.defineProperty(addMonths, 'namespace', {value: NS});
Object.defineProperty(monthDayFirst, 'namespace', {value: NS});
Object.defineProperty(monthDayLast, 'namespace', {value: NS});
Object.defineProperty(nextMonthDayFirst, 'namespace', {value: NS});
Object.defineProperty(parseAsUtc, 'namespace', {value: NS});
Object.defineProperty(subtractDays, 'namespace', {value: NS});
Object.defineProperty(subtractMinutes, 'namespace', {value: NS});

export {
    addDays,
    addMinutes,
    addMonths,
    monthDayFirst,
    monthDayLast,
    nextMonthDayFirst,
    parseAsUtc,
    subtractDays,
    subtractMinutes,
}
