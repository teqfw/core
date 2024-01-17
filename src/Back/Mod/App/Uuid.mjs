/**
 * Backend application UUID.
 * @namespace TeqFw_Core_Back_Mod_App_Uuid
 */
// MODULE'S IMPORT
import {join} from 'node:path';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';

export default class TeqFw_Core_Back_Mod_App_Uuid {
    /**
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Core_Back_Config$: config,
        }
    ) {
        // VARS
        let _uuid;

        // INSTANCE METHODS
        this.get = () => _uuid;

        /**
         * Load backend UUID from the file or generate new one.
         */
        this.init = async function () {
            const root = config.getPathToRoot();
            const path = join(root, DEF.FILE_UUID);
            if (!(existsSync(path))) {
                const dirUp = join(path, '..');
                if (!(existsSync(path))) await mkdir(dirUp, {recursive: true});
                writeFileSync(path, randomUUID());
                logger.info(`New backend UUID is generated and stored in '${path}'.`);
            }
            const buffer = readFileSync(path);
            _uuid = buffer.toString();
            logger.info(`Backend UUID '${_uuid}' is loaded from '${path}'.`);
        }
    }
}
