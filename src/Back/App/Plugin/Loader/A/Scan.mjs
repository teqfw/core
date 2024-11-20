/**
 * Scan function to look up for teq-plugins in the given folder and all npm packages in the `node_modules` folder.
 * The result is an object with DTOs that contain `package.json` and `teqfw.json` data for the found teq-plugins.
 */
// MODULE'S IMPORT
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

// MODULE'S VARS
const PACKAGE = 'package.json';
const TEQFW = 'teqfw.json';

// MODULE'S CLASSES

/**
 * Structure to represent found data.
 *
 * @memberOf TeqFw_Core_Back_App_Plugin_Loader_A_Scan
 */
class Dto {
    /** @type {Object} 'package.json' data */
    package;
    /** @type {String} absolute path to the root of the plugin package */
    path;
    /** @type {Object} 'teqfw.json' data */
    teqfw;
}

/**
 * @param {string} path
 * @returns {Object<string, Dto>} - the key is an absolute path to the teq-plugin
 * @namespace TeqFw_Core_Back_App_Plugin_Loader_A_Scan
 */
export default function (path) {
    // FUNCS
    function readData(path) {
        // FUNCS
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

        // MAIN
        let result = null;
        const pathTeqfw = join(path, TEQFW);
        const pathPkg = join(path, PACKAGE);
        const dataTeqfw = readJson(pathTeqfw);
        const dataPkg = readJson(pathPkg);
        if ((dataTeqfw !== null) && (dataPkg !== null)) {
            result = new Dto();
            result.teqfw = dataTeqfw;
            result.package = dataPkg;
            result.path = path;
        }
        return result;
    }

    // MAIN
    const result = {};
    // get scan data for root folder (application itself)
    const dataRoot = readData(path);
    if (dataRoot !== null) result[path] = dataRoot;
    // scan 'node modules' packages for TeqFW plugins
    const pathNodeMods = join(path, 'node_modules');
    if (existsSync(pathNodeMods)) {
        const packages = readdirSync(pathNodeMods);
        for (const pack of packages) {
            if (pack[0] === '@') {
                // scan scope for nested packages
                const pathScope = join(pathNodeMods, pack);
                const scopedPackages = readdirSync(pathScope);
                for (const sub of scopedPackages) {
                    const pathNested = join(pathScope, sub);
                    const dataNested = readData(pathNested);
                    if (dataNested !== null) result[pathNested] = dataNested;
                }
            } else {
                // check package
                const pathNested = join(pathNodeMods, pack);
                const dataNested = readData(pathNested);
                if (dataNested !== null) result[pathNested] = dataNested;
            }
        }
    }
    return result;
}