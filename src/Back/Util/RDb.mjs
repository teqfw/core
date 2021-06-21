/**
 * Relational DB utilities.
 *
 * @namespace TeqFw_Core_App_Back_Util_RDb
 */
// MODULE'S VARS
const NS = 'TeqFw_Core_App_Back_Util_RDb';

// MODULE'S FUNCTIONS

/**
 * Get list of available tables.
 * @param trx
 * @return {Promise<*[]>}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
async function getTables(trx) {
    const result = [];
    const dialect = trx.client.config.client;
    if (['mysql', 'mysql2'].includes(dialect)) {
        const rs = await trx.raw('show tables');
        if (Array.isArray(rs)) {
            const column = rs[1][0]['name'];
            rs[0].map(one => result.push(one[column]));
        }
    } else if (['pg'].includes(dialect)) {
        const rs = await trx.raw('SELECT * FROM information_schema.tables  WHERE table_schema = \'public\'');
        if (Array.isArray(rs?.rows)) {
            rs.rows.map(one => result.push(one['table_name']));
        }
    } else {
        throw new Error(`This dialect (${dialect}) is not supported.`);
    }
    return result;
}

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
 * Insert table items selected by 'itemsSelect'.
 * @param trx
 * @param dump
 * @param entity
 * @return {Promise<void>}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
async function itemsInsert(trx, dump, entity) {
    if (Array.isArray(dump[entity]) && dump[entity].length > 0) {
        await trx(entity).insert(dump[entity]);
    }
}

/**
 * Select * from 'entity' if 'entity' exists in 'tables' or null otherwise.
 * @param trx
 * @param {string[]} tables
 * @param {string} entity
 * @param {string[]|null} cols
 * @returns {Promise<*|null>}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
async function itemsSelect(trx, tables, entity, cols = null) {
    if (tables.includes(entity)) {
        if (Array.isArray(cols)) {
            return await trx.select(cols).from(entity);
        } else {
            return await trx.select().from(entity);
        }
    } else {
        return null;
    }
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

/**
 * Get 'nextval' for Postgres serial.
 * @param schema
 * @param {String[]} serials
 * @returns {Promise<Object>}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
async function serialsGet(schema, serials) {
    const result = {};
    for (const one of serials) {
        schema.raw(`SELECT nextval('${one}')`);
    }
    const rs = await schema;
    for (const i in rs.rows) {
        const key = serials[i];
        result[key] = rs.rows[0].nextval;
    }
    return result;
}

/**
 * Get nextval for Postgres serial.
 * @param schema
 * @param {Object} serials
 * @returns {Promise<void>}
 * @memberOf TeqFw_Core_App_Back_Util_RDb
 */
async function serialsSet(schema, serials) {
    for (const one of Object.keys(serials)) {
        if (one !== 'app_group_id_seq')
            schema.raw(`SELECT setval('${one}', ${serials[one]})`);
    }
    await schema;
}


// MODULE'S EXPORT
Object.defineProperty(isPostgres, 'name', {value: `${NS}.${isPostgres.name}`});
Object.defineProperty(nameFK, 'name', {value: `${NS}.${nameFK.name}`});
Object.defineProperty(nameNX, 'name', {value: `${NS}.${nameNX.name}`});
Object.defineProperty(nameUQ, 'name', {value: `${NS}.${nameUQ.name}`});

export {
    getTables,
    isPostgres,
    itemsInsert,
    itemsSelect,
    nameFK,
    nameNX,
    nameUQ,
    serialsGet,
    serialsSet,
};
