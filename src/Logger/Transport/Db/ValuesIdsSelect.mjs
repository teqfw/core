const TBL_TEQ_LOG_MARKER_VALUE = "teq_log_marker_value";

/**
 *  Select markers values for given markers, register new values if not found.
 */
export default class TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Db_Connector} */
        const _db = spec.TeqFw_Core_App_Db_Connector$;
        /** @type {Object} - cache for already selected values {code_id: {value: value_id}} */
        const _cached_values = {};
        const _knex = _db.get();

        /**
         *
         * Select markers values for given markers and markers codes, register new values if not found.
         *
         * @param {Object} markers - markers values ({code: value})
         * @param {Object} codes - code IDs ({code_value: code_id})
         * @return {Promise<Array>}
         * @memberOf TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect.prototype
         */
        this.exec = async function ({markers, codes}) {
            const result = [];
            // scan all markers and try to look up markers values in the object's cache
            const keys = Object.keys(markers);
            const not_in_cache = [];
            for (const code of keys) {
                const value = markers[code];
                if (_cached_values[code] && _cached_values[code][value]) {
                    result.push(_cached_values[code][value]);
                } else {
                    const code_id = codes[code];
                    const entry = {code_id, value};
                    not_in_cache.push(entry);
                }
            }
            if (not_in_cache.length > 0) {
                // compose statement to find values not in cache
                const sql = _knex(TBL_TEQ_LOG_MARKER_VALUE);
                for (const one of not_in_cache) {
                    sql.orWhere(function () {
                        this.where("code_id", one.code_id)
                            .where("value", one.value);
                    });
                }
                const rs_found = await sql;
                const found_values = {};
                for (const row of rs_found) {
                    const value_id = row["id"];
                    const code_id = row["code_id"];
                    const value = row["value"];
                    result.push(value_id);
                    found_values[code_id] = found_values[code_id] || {};
                    found_values[code_id][value] = true;
                    if (
                        (_cached_values[code_id] || (_cached_values[code_id] = {})) &&
                        (_cached_values[code_id][value] === undefined)
                    ) {
                        _cached_values[code_id][value] = value_id;
                    }
                }
                // filter missed values to insert as new
                const missed_values = not_in_cache.filter(elem => {
                    const code_id = elem.code_id;
                    const value = elem.value;
                    const result = (found_values[code_id] && found_values[code_id][value]) !== true;
                    return result;
                });
                for (const missed_value of missed_values) {
                    const code_id = missed_value.code_id;
                    const value = missed_value.value;
                    try {
                        const row = await _knex(TBL_TEQ_LOG_MARKER_VALUE).insert({code_id, value});
                        const inserted_id = row.pop();
                        _cached_values[code_id] = _cached_values[code_id] || {};
                        _cached_values[code_id][value] = inserted_id;
                        result.push(inserted_id);
                    } catch (e) {
                        // error on codes duplication (async effect)
                        result.push(_cached_values[code_id][value]);
                    }
                }
            }
            return result;
        };
    }
}