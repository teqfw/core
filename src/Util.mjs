/**
 * Various utilities.
 */

/**
 * Set all properties as immutable for the object.
 * @param {Object} obj
 */
function TeqFw_Core_App_Util_ObjectImmutate(obj) {
    for (const key of Object.keys(obj)) {
        Object.defineProperty(obj, key, {configurable: false, writable: false});
    }
}

export {
    TeqFw_Core_App_Util_ObjectImmutate as ObjectImmutate,
};
