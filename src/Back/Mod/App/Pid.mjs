/**
 * Model to write/read the process ID (PID) to stop previously started instance of teq-app.
 */
// MODULE'S IMPORT
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {mkdir} from 'node:fs/promises';

export default class TeqFw_Core_Back_Mod_App_Pid {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {string} filename
         * @returns {Promise<number>}
         */
        this.readPid = async function (filename) {
            let res;
            try {
                const root = config.getPathToRoot();
                const full = join(root, filename);
                const data = readFileSync(full);
                res = cast.int(data);
            } catch (e) {
                logger.info(`Cannot read PID from file '${filename}'. Error: ${e.toString()}`);
            }
            return res;
        }

        /**
         * Stop running process by PID.
         * @param pid
         */
        this.stop = function (pid) {
            logger.info(`Stopping process with PID=${pid}.`);
            try {
                process.kill(pid, 'SIGINT');
            } catch (e) {
                logger.error(`Cannot kill process with PID=${pid}. Error: ${e.toString()}`);
            }
        }

        /**
         * @param {string} filename
         * @returns {Promise<void>}
         */
        this.writePid = async function (filename) {
            const root = config.getPathToRoot();
            const full = join(root, filename);
            const dirUp = join(full, '..');
            if (!(existsSync(dirUp))) await mkdir(dirUp, {recursive: true});
            const pid = process.pid.toString();
            writeFileSync(full, pid);
            logger.info(`TeqFW app PID '${pid}' is saved to '${full}'.`);
        }
    }
}
