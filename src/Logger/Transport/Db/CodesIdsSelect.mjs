const TBL_TEQ_LOG_MARKER_CODE = "teq_log_marker_code";

/**
 *  Select markers IDs for given markers codes, register new codes if not found.
 */
export default class TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect {
    constructor(spec) {
        /** @type {TeqFw_Core_App_Db_Connector} */
        const _db = spec.TeqFw_Core_App_Db_Connector;
        /** @type {Object} - cache for already selected codes {code: id} */
        const _cached_codes = {};
        const _knex = _db.get();

        /**
         * Select markers IDs for given markers codes, register new codes if not found.
         *
         * @param {Object} markers - Markers values ({code: value})
         * @return {Promise<Object>}
         * @memberOf TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect.prototype
         */
        this.exec = async function (markers) {
            const result = {};
            // scan all markers and try to look up markers codes in the object's cache
            const keys = Object.keys(markers);
            const not_in_cache = [];
            for (const code of keys) {
                if (Object.keys(_cached_codes).includes(code)) {
                    result[code] = _cached_codes[code];
                } else {
                    not_in_cache.push(code);
                }
            }
            if (not_in_cache.length > 0) {
                // find codes not in cache
                const rs_found = await _knex(TBL_TEQ_LOG_MARKER_CODE)
                    .whereIn("code", not_in_cache);
                const found_codes = [];
                for (const row of rs_found) {
                    const code_id = row["id"];
                    const code_value = row["code"];
                    result[code_value] = code_id;
                    found_codes.push(code_value);
                    if (_cached_codes[code_value] === undefined) _cached_codes[code_value] = code_id;
                }
                // filter missed codes to insert as new
                const missed_codes = not_in_cache.filter(elem => {
                    return found_codes.indexOf(elem) < 0;
                });
                for (const missed_code of missed_codes) {
                    try {
                        const row = await _knex(TBL_TEQ_LOG_MARKER_CODE).insert({"code": missed_code});
                        const inserted_id = row.pop();
                        _cached_codes[missed_code] = inserted_id;
                        result[missed_code] = inserted_id;
                    } catch (e) {
                        // error on codes duplication (async effect)
                        result[missed_code] = _cached_codes[missed_code];
                    }
                }
            }
            return result;
        };

    }
}