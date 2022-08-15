/**
 * Date manipulation functions.
 * @namespace TeqFw_Core_Shared_Util_Date
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Date';

/**
 * Add days to given date or to now.
 * @param {number} days
 * @param {Date} [date]
 * @return {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addDays(days, date) {
    const res = (date instanceof Date) ? date : new Date();
    res.setDate(res.getDate() + Math.abs(days));
    return res;
}

/**
 * Add minutes to given date or to now.
 * @param {number} minutes
 * @param {Date} [date]
 * @return {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addMinutes(minutes, date) {
    const res = (date instanceof Date) ? date : new Date();
    res.setMinutes(res.getMinutes() + Math.abs(minutes));
    return res;
}

/**
 * Add months to given date or to now.
 * @param {number} months
 * @param {Date} [date]
 * @return {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function addMonths(months, date) {
    const res = (date instanceof Date) ? date : new Date();
    res.setMonth(res.getMonth() + Math.abs(months));
    return res;
}

/**
 * Subtract days from given date or from now.
 * @param {number} days
 * @param {Date} [date]
 * @return {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function subtractDays(days, date) {
    const res = (date instanceof Date) ? date : new Date();
    res.setDate(res.getDate() - Math.abs(days));
    return res;
}

/**
 * Subtract minutes from given date or from now.
 * @param {number} minutes
 * @param {Date} [date]
 * @return {Date}
 * @memberOf TeqFw_Core_Shared_Util_Date
 */
function subtractMinutes(minutes, date) {
    const res = (date instanceof Date) ? date : new Date();
    res.setMinutes(res.getMinutes() - Math.abs(minutes));
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(addDays(), 'namespace', {value: NS});
Object.defineProperty(addMinutes, 'namespace', {value: NS});
Object.defineProperty(addMonths, 'namespace', {value: NS});
Object.defineProperty(subtractDays, 'namespace', {value: NS});
Object.defineProperty(subtractMinutes, 'namespace', {value: NS});

export {
    addDays,
    addMinutes,
    addMonths,
    subtractDays,
    subtractMinutes,
}
