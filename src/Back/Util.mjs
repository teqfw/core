/**
 * Set of utilities to use on backend only.
 * @namespace TeqFw_Core_Back_Util
 */
// MODULE'S IMPORT
import {readFileSync, statSync, existsSync, readdirSync} from 'fs';
import {join} from 'path';

/**
 * Check existence of JSON file, read content, parse JSON and return data.
 *
 * @param {String} filename
 * @returns {Object|null}
 * @memberOf TeqFw_Core_Back_Util
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

/**
 * Scan '${path}/node_modules' (or '${path}' if 'node_modules' does not exist)
 * for files named  '${filename}'.
 * @param {string} path
 * @param {string} filename
 * @return {string[]}
 * @memberOf TeqFw_Core_Back_Util
 */
function scanNodeModules(path, filename) {
    const res = [];
    const pathNode = join(path, 'node_modules');
    const root = existsSync(pathNode) ? pathNode : path;
    const packages = readdirSync(root);
    for (const pack of packages) {
        if (pack[0] === '@') {
            // scan '@pack/...' scope for nested packages
            const pathScope = join(root, pack);
            const scopedPackages = readdirSync(pathScope);
            for (const sub of scopedPackages) {
                const fileNested = join(pathScope, sub, filename);
                if (existsSync(fileNested)) res.push(fileNested);
            }
        } else {
            const fileNested = join(root, pack, filename);
            if (existsSync(fileNested)) res.push(fileNested);
        }
    }
    return res;
}

export {
    readJson,
    scanNodeModules
}
