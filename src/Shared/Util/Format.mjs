/**
 * Formatting functions.
 * @namespace TeqFw_Core_Shared_Util_Format
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_Core_Shared_Util_Format';

/**
 * Convert date as UTC to YYYY/MM/DD HH:MM:SS.
 * @param {Date} date
 * @return {string}
 * @memberOf TeqFw_Core_Shared_Util_Format
 */
function formatDateTimeForLog(date) {
    const y = date.getUTCFullYear();
    const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const d = `${date.getUTCDate()}`.padStart(2, '0');
    const h = `${date.getUTCHours()}`.padStart(2, '0');
    const i = `${date.getUTCMinutes()}`.padStart(2, '0');
    const s = `${date.getUTCSeconds()}`.padStart(2, '0');
    return `${y}/${m}/${d} ${h}:${i}:${s}`;
}

// finalize code components for this es6-module
Object.defineProperty(formatDateTimeForLog, 'name', {value: `${NS}.${formatDateTimeForLog.name}`});

export {
    formatDateTimeForLog,
}
