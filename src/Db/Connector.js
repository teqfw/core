"use strict";
/* ==============================================================================
 * Import. Module level constants/variables have prefix "$".
 * =========================================================================== */
const $knex = require("knex");

/**
 * TeqFW  object description.
 *
 * @param {TeqFw_Core_App_Configurator} TeqFw_Core_App_Configurator
 * @return {TeqFw_Core_App_Db_Connector}
 * @constructor
 */
function TeqFw_Core_App_Db_Connector(
    TeqFw_Core_App_Configurator
) {
    /** @type TeqFw_Core_App_Configurator */
    const _config = TeqFw_Core_App_Configurator;
    let _knex;


    this.init = function () {
        return new Promise(function (resolve) {
            const spec = _config.get("/local/db/main");
            _knex = $knex(spec);
            resolve();
        });
    };

    this.get = function () {
        return _knex;
    }

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* Module exports */
module.exports = TeqFw_Core_App_Db_Connector;