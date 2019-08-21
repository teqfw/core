import $fs from "fs";
import $path from "path";

/**
 * Command to stop application's web server.
 */
export default class TeqFw_Core_App_Cli_Server_Stop {
    /* Definitions of the object structures */
    /**
     * @typedef {Object} TeqFw_Core_App_Cli_Server_Stop.OwnType
     * @property {string} prop_str
     * @property {Object} prop_obj
     */

    constructor(spec) {
        /* Private properties of the object */
        /** @type {TeqFw_Core_App_Configurator} */
        const _config = spec.TeqFw_Core_App_Configurator;
        /** @type {TeqFw_Core_App_Config} */
        const _cfg = spec.TeqFw_Core_App_Config;

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
                console.log(`Stop web server (PID: ${str_data}).`);
                process.kill(str_data, "SIGINT");
            });
        };
    }
}