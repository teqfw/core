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
    res.setDate(res.getDate() + days);
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
    res.setMinutes(res.getMinutes() + minutes);
    return res;
}

// finalize code components for this es6-module
Object.defineProperty(addDays(), 'namespace', {value: NS});
Object.defineProperty(addMinutes, 'namespace', {value: NS});

export {
    addDays,
    addMinutes,
}
