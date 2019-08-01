"use strict";

const TBL_TEQ_LOG = "teq_log";
const TBL_TEQ_LOG_MARKER = "teq_log_marker";
const TBL_TEQ_LOG_REL_MARKER = "teq_log_rel_marker";

/**
 * Transport to save logs into DB.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @param {TeqFw_Core_App_Db_Connector} TeqFw_Core_App_Db_Connector
 * @return {TeqFw_Core_App_Logger_Transport_Db}
 * @constructor
 */
function TeqFw_Core_App_Logger_Transport_Db(
    TeqFw_Core_App_Configurator,
    TeqFw_Core_App_Db_Connector
) {
    /** @type {TeqFw_Core_App_Configurator} */
    const _config = TeqFw_Core_App_Configurator;
    /** @type {TeqFw_Core_App_Db_Connector} */
    const _db = TeqFw_Core_App_Db_Connector;

    const app_instance_id = _config.get("local/app/instance");
    const pid = process.pid;

    this.process = async function (logs) {
        const knex = _db.get();

        /**
         *
         * @param {Array} markers
         * @return {Array} IDs of the given markers
         */
        async function validate_markers(markers) {
            const result = [];
            knex.select()
                .from(TBL_TEQ_LOG_MARKER)
                .where("code", [])
                .then(() => {
                    return result;
                });
        }

        for (const one of logs) {
            const markers = one.markers || [];
            markers.push({"inst": app_instance_id});
            markers.push({"pid": pid});
            // const markers_ids = await validate_markers(markers);
            knex(TBL_TEQ_LOG).insert({
                date: new Date(one.date),
                level: one.level,
                message: one.message,
                details: one.details
            }, (returning) => {
                const boo = returning;
            }).then((rs, err) => {
                const boo = 4;
            });
        }
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Logger_Transport_Db;