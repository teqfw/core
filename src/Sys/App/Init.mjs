/**
 * This object is executed on application initialization.
 */
export default class TeqFw_Core_App_Sys_App_Init {
    constructor(spec) {
        const _logger = spec.TeqFw_Core_App_Logger$;
        /** @type {TeqFw_Core_App_Commander} */
        const _commander = spec.TeqFw_Core_App_Commander$;
        /** @type {TeqFw_Core_App_Registry_Server_Route} */
        const _reg_back_routes = spec.TeqFw_Core_App_Registry_Server_Route$;
        /** @type {TeqFw_Core_App_Cli_Server_Start} */
        const _command_start = spec.TeqFw_Core_App_Cli_Server_Start$;
        /** @type {TeqFw_Core_App_Cli_Server_Stop} */
        const _command_stop = spec.TeqFw_Core_App_Cli_Server_Stop$;
        /** @type {TeqFw_Core_App_Server_Route_Handler_Empty} */
        const _hndl_empty = spec.TeqFw_Core_App_Server_Route_Handler_Empty$;
        /** @type {TeqFw_Core_App_Server_Route_Handler_Config_Get} */
        const _hndl_config_get = spec.TeqFw_Core_App_Server_Route_Handler_Config_Get$;
        /** @type {TeqFw_Core_App_Server_Route_Handler_Routes_Get} */
        const _hndl_routes_get = spec.TeqFw_Core_App_Server_Route_Handler_Routes_Get$;

        /**
         * Perform initialization of the module.
         *
         * @return {Promise<void>}
         * @memberOf TeqFw_Core_App_Sys_App_Init.prototype
         */
        this.exec = async function () {
            function init_commander() {
                _commander.addCommand({
                    flags: "--core-server-start",
                    description: "Start application's web server.",
                    action: _command_start.exec
                });
                _commander.addCommand({
                    flags: "--core-server-stop",
                    description: "Stop application's web server.",
                    action: _command_stop.exec
                });
            }

            function init_back_routes() {
                _reg_back_routes.add({path: "/core/app/config/get", handler: _hndl_config_get});
                _reg_back_routes.add({path: "/core/app/routes/get", handler: _hndl_routes_get});
            }

            init_commander();
            init_back_routes();
            _logger.info("Init Server module.");
        };
    }
}