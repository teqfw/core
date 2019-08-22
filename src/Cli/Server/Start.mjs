import $fs from "fs";
import $path from "path";

/**
 * Command to start application's web server.
 */
export default class TeqFw_Core_App_Cli_Server_Start {

    constructor(spec) {
        /** @type {TeqFw_Core_App_Configurator} */
        const _config = spec.TeqFw_Core_App_Configurator;
        /** @type {TeqFw_Core_App_Config} */
        const _cfg = spec.TeqFw_Core_App_Config;
        /** @type {TeqFw_Core_App_Server} */
        const _server = spec.TeqFw_Core_App_Server;

        /**
         * Start web server and save PID into file.
         * @memberOf TeqFw_Core_App_Cli_Server_Start.prototype
         */
        this.exec = function () {
            _server.init().then(() => {
                const pid = process.pid;
                const path_root = _config.get("path/root");
                const pid_path = $path.join(path_root, _cfg.PID_FILE_NAME);

                // write PID to file then start the server
                $fs.writeFile(pid_path, pid, (err) => {
                    if (err) throw err;
                    // PID is wrote => start the server
                    _server.listen(_cfg.SERVER_DEFAULT_PORT, (err) => {
                        console.log(`Web server is listening on port ${_cfg.SERVER_DEFAULT_PORT}. PID: ${pid}.`);
                    });
                });
            });
        };
    }
}