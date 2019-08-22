import $fs from "fs";
import $path from "path";

/**
 * Command to stop application's web server.
 */
export default class TeqFw_Core_App_Cli_Server_Stop {

    constructor(spec) {
        /* Private properties of the object */
        /** @type {TeqFw_Core_App_Configurator} */
        const _config = spec.TeqFw_Core_App_Configurator;
        /** @type {TeqFw_Core_App_Config} */
        const _cfg = spec.TeqFw_Core_App_Config;
        /** @type {TeqFw_Core_App_Instance} */
        const _app = spec.TeqFw_Core_App_Instance;
        /** @type {TeqFw_Core_App_Logger} */
        const _logger = spec.TeqFw_Core_App_Logger;


        /* Public methods of the object */
        /**
         * Read PID from file and stop web server process.
         * @memberOf TeqFw_Core_App_Cli_Server_Stop.prototype
         */
        this.exec = function () {
            const path_root = _config.get("path/root");
            const pid_path = $path.join(path_root, _cfg.PID_FILE_NAME);
            $fs.readFile(pid_path, (err, data) => {
                if (err) throw err;
                const str_data = data.toString();
                _logger.info(`Stop web server (PID: ${str_data}).`);
                process.kill(str_data, "SIGINT");
                // stop current app instance (close DB connections, etc.)
                _app.stop().then(() => {
                    /* do nothing */
                });
            });
        };
    }
}