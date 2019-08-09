"use strict";

const TBL_TEQ_LOG = "teq_log";
const TBL_TEQ_LOG_TO_MARKER = "teq_log_to_marker";

/**
 * Transport to save logs into DB.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @param {TeqFw_Core_App_Db_Connector} TeqFw_Core_App_Db_Connector
 * @param {TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect} TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect
 * @param {TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect} TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect
 * @return {TeqFw_Core_App_Logger_Transport_Db}
 * @constructor
 */
function TeqFw_Core_App_Logger_Transport_Db(
    TeqFw_Core_App_Configurator,
    TeqFw_Core_App_Db_Connector,
    TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect,
    TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect
) {
    /** @type {TeqFw_Core_App_Configurator} */
    const _config = TeqFw_Core_App_Configurator;
    /** @type {TeqFw_Core_App_Db_Connector} */
    const _db = TeqFw_Core_App_Db_Connector;
    /** @type {TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect} */
    const _select_codes = TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect;
    /** @type {TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect} */
    const _select_values = TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect;

    const _app_instance_id = _config.get("local/app/instance");
    const _pid = process.pid;

    this.process = async function (logs) {
        const knex = _db.get();

        async function process_one(log_item) {
            const markers = log_item.markers || {};
            markers["inst"] = _app_instance_id;
            markers["pid"] = _pid;
            const codes = await _select_codes.exec(markers);
            const values_ids = await _select_values.exec({markers, codes});
            const log_id = await knex(TBL_TEQ_LOG).insert({
                date: new Date(log_item.date),
                level: log_item.level_default,
                message: log_item.message,
                details: log_item.details
            });
            const val_inserts = knex(TBL_TEQ_LOG_TO_MARKER);
            for (const value_id of values_ids) {
                val_inserts.insert({
                    log_id,
                    marker_id: value_id
                });
                await val_inserts;
            }
        }

        for (const log of logs) {
            await process_one(log);
        }
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Logger_Transport_Db;