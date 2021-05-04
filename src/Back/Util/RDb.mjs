/**
 * Relational DB utilities.
 *
 * @namespace TeqFw_Core_App_Back_Util_RDb
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_App_Back_Util_RDb';

// MODULE'S FUNCTIONS

/**
 * Return 'true' if knex client is connected to Postgres DB.
 * @param client
 * @return {boolean}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
function isPostgres(client) {
    return client.constructor.name === 'Client_PG';
}

/**
 * Create name for foreign key constraint.
 *
 * @param {String} tblSrc
 * @param {String|String[]} fldSrc
 * @param {String} tblTrg
 * @param {String|String[]} fldTrg
 * @returns {String}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
function nameFK(tblSrc, fldSrc, tblTrg, fldTrg) {
    let result = `FK_${tblSrc}_`;
    // type of fldSrc should correspond to type of fldTrg
    if (typeof fldSrc === 'string') {
        result += `_${fldSrc}__${tblTrg}__${fldTrg}`;  // tblSrc__col__tblTrg__col
    } else if (Array.isArray(fldSrc)) { // tblSrc__col1_col2__tblTrg__col1_col2
        for (const one of fldSrc) result += `_${one}`;
        result += `__${tblTrg}_`;
        for (const one of fldTrg) result += `_${one}`;
    }
    return result;
}

/**
 * Create name for index key constraint.
 *
 * @param {String} tbl
 * @param {String|String[]} fld
 * @returns {String}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
function nameNX(tbl, fld) {
    let result = `IK_${tbl}_`;
    if (typeof fld === 'string') {
        result += `_${fld.toLowerCase()}`;
    } else if (Array.isArray(fld)) {
        for (const one of fld) result += `_${one.toLowerCase()}`;
    }
    return result;
}

/**
 * Create name for unique key constraint.
 *
 * @param {String} tbl
 * @param {String|String[]} fld
 * @returns {String}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
function nameUQ(tbl, fld) {
    let result = `UK_${tbl}_`;
    if (typeof fld === 'string') {
        result += `_${fld.toLowerCase()}`;
    } else if (Array.isArray(fld)) {
        for (const one of fld) result += `_${one.toLowerCase()}`;
    }
    return result;
}


// MODULE'S EXPORT
Object.defineProperty(isPostgres, 'name', {value: `${NS}.${isPostgres.name}`});
Object.defineProperty(nameFK, 'name', {value: `${NS}.${nameFK.name}`});
Object.defineProperty(nameNX, 'name', {value: `${NS}.${nameNX.name}`});
Object.defineProperty(nameUQ, 'name', {value: `${NS}.${nameUQ.name}`});

export {
    isPostgres,
    nameFK,
    nameNX,
    nameUQ,
};
