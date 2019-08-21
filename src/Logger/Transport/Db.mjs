const TBL_TEQ_LOG = "teq_log";
const TBL_TEQ_LOG_TO_MARKER = "teq_log_to_marker";

/**
 * Transport to save logs into DB.
 */
export default class TeqFw_Core_App_Logger_Transport_Db {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Configurator} */
        const _config = spec.TeqFw_Core_App_Configurator;
        /** @type {TeqFw_Core_App_Db_Connector} */
        const _db = spec.TeqFw_Core_App_Db_Connector;
        /** @type {TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect} */
        const _select_codes = spec.TeqFw_Core_App_Logger_Transport_Db_CodesIdsSelect;
        /** @type {TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect} */
        const _select_values = spec.TeqFw_Core_App_Logger_Transport_Db_ValuesIdsSelect;

        const _app_instance_id = _config.get("local/app/instance");
        const _pid = process.pid;

        /**
         * Process all log entries.
         *
         * @param logs
         * @memberOf TeqFw_Core_App_Logger_Transport_Db.prototype
         */
        this.process = async function (logs) {
            const knex = _db.get();

            async function process_one(log_item) {
                const markers = log_item.markers || {};
                markers["inst"] = _app_instance_id;
                markers["pid"] = _pid;
                try {
                    const codes = await _select_codes.exec(markers);
                    const values_ids = await _select_values.exec({markers, codes});
                    const log_id = await knex(TBL_TEQ_LOG).insert({
                        date: new Date(log_item.date),
                        level: log_item.level,
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
                } catch (e) {
                    const bp = true;
                }
            }

            for (const log of logs) {
                await process_one(log);
            }
        };
    }
}