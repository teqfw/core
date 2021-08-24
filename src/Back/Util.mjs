/**
 * Set of utilities to use on backend only.
 * @namespace TeqFw_Core_Back_Util
 */
// MODULE'S IMPORT
import {readFileSync, statSync} from 'fs';

/**
 * Check existence of JSON file, read content, parse JSON and return data.
 *
 * @param {String} filename
 * @returns {Object|null}
 */
function readJson(filename) {
    let result = null;
    try {
        const stat = statSync(filename);
        if (stat.isFile()) {
            const buffer = readFileSync(filename);
            const content = buffer.toString();
            const json = JSON.parse(content);
            if (typeof json === 'object') {
                result = json;
            }
        }
    } catch (e) {
        // stealth exception if JSON file does not exist.
        if (e.code !== 'ENOENT' && e.code !== 'ENOTDIR') {
            // re-throw other exceptions (wrong format or something else)
            throw e;
        }
    }
    return result;
}

export {
    readJson
}
