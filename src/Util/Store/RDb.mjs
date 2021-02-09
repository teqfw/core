/**
 * Create name for foreign key constraint.
 *
 * @param {String} tblSrc
 * @param {String|String[]} fldSrc
 * @param {String} tblTrg
 * @param {String|String[]} fldTrg
 * @returns {string}
 * @exports TeqFw_Core_App_Util_Store_RDb_NameForForeignKey
 */
function TeqFw_Core_App_Util_Store_RDb_NameForForeignKey(tblSrc, fldSrc, tblTrg, fldTrg) {
    let result = `FK_${tblSrc}_`;
    // type of fldSrc should correspond to type of fldTrg
    if (typeof fldSrc === 'string') {
        result += `_${fldSrc}__${tblTrg}__${fldTrg}`;  // tblSrc__col__tblTrg__col
    } else if (Array.isArray(fldSrc)) { // tblSrc__col1_col2__tblTrg__col1_col2
        for (const one of fldSrc) {
            result += `_${one}`;
        }
        result += `__${tblTrg}_`;
        for (const one of fldTrg) {
            result += `_${one}`;
        }
    }
    return result;
}

/**
 * Create name for index key constraint.
 *
 * @param {String} tbl
 * @param {String|String[]} fld
 * @returns {string}
 * @exports TeqFw_Core_App_Util_Store_RDb_NameForUniqueKey
 */
function TeqFw_Core_App_Util_Store_RDb_NameForIndexKey(tbl, fld) {
    let result = `IK_${tbl}_`;
    if (typeof fld === 'string') {
        result += `_${fld.toLowerCase()}`;
    } else if (Array.isArray(fld)) {
        for (const one of fld) {
            result += `_${one.toLowerCase()}`;
        }
    }
    return result;
}

/**
 * Create name for unique key constraint.
 *
 * @param {String} tbl
 * @param {String|String[]} fld
 * @returns {string}
 * @exports TeqFw_Core_App_Util_Store_RDb_NameForUniqueKey
 */
function TeqFw_Core_App_Util_Store_RDb_NameForUniqueKey(tbl, fld) {
    let result = `UK_${tbl}_`;
    if (typeof fld === 'string') {
        result += `_${fld.toLowerCase()}`;
    } else if (Array.isArray(fld)) {
        for (const one of fld) {
            result += `_${one.toLowerCase()}`;
        }
    }
    return result;
}

export {
    TeqFw_Core_App_Util_Store_RDb_NameForForeignKey as NameForForeignKey,
    TeqFw_Core_App_Util_Store_RDb_NameForIndexKey as NameForIndexKey,
    TeqFw_Core_App_Util_Store_RDb_NameForUniqueKey as NameForUniqueKey,
};
