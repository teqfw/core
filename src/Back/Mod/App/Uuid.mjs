/**
 * Backend application UUID.
 * @namespace TeqFw_Core_Back_Mod_App_Uuid
 */
// MODULE'S IMPORT
import {join} from "node:path";
import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';

export default class TeqFw_Core_Back_Mod_App_Uuid {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        const logger = spec['TeqFw_Core_Shared_Api_Logger$$']; // instance
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];

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
                const cfgDir = join(path, '..');
                if (!(existsSync(path))) await mkdir(cfgDir, {recursive: true});
                writeFileSync(path, randomUUID());
                logger.info(`New backend UUID is generated and stored in '${path}'.`);
            }
            const buffer = readFileSync(path);
            _uuid = buffer.toString();
            logger.info(`Backend UUID '${_uuid}' is loaded from '${path}'.`);
        }
    }
}
