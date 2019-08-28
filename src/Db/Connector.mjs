import $knex from "knex";

/**
 * "knex" based DB connection provider.
 */
export default class TeqFw_Core_App_Db_Connector {

    constructor(spec) {
        /** @type TeqFw_Core_App_Configurator */
        const _config = spec.TeqFw_Core_App_Configurator$;
        let _knex;

        /**
         * Get DB connection parameters from local config and init "knex" object.
         *
         * @return {Promise<void>}
         * @memberOf TeqFw_Core_App_Db_Connector.prototype
         */
        this.init = function () {
            return new Promise(function (resolve) {
                const spec = _config.get("/local/db/main");
                _knex = $knex(spec);
                resolve();
            });
        };

        /**
         * Get "knex" object to work with DB data.
         *
         * @return {*}
         * @memberOf TeqFw_Core_App_Db_Connector.prototype
         */
        this.get = function () {
            return _knex;
        }

    }
}