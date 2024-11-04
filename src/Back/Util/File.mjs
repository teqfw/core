/**
 * A set of functions related to filesystem handling within TeqFW projects.
 */
// MODULE'S IMPORT
import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join} from 'node:path';

// MODULE'S CLASSES
export default class TeqFw_Core_Back_Util_File {
    /**
     * Check existence of JSON file, read content, parse JSON and return data.
     *
     * @param {String} filename
     * @returns {Object|null}
     * @memberOf TeqFw_Core_Back_Util
     */
    readJson(filename) {
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
                e.message = `${e.message} (file: ${filename})`;
                throw e;
            }
        }
        return result;
    }

    /**
     * Check existence of file, read content and return data as string.
     *
     * @param {String} filename
     * @returns {string|null}
     * @memberOf TeqFw_Core_Back_Util
     */
    readString(filename) {
        let result = null;
        try {
            const stat = statSync(filename);
            if (stat.isFile()) {
                const buffer = readFileSync(filename);
                result = buffer.toString();
            }
        } catch (e) {
            // stealth exception if JSON file does not exist.
            if (e.code !== 'ENOENT' && e.code !== 'ENOTDIR') {
                // re-throw other exceptions (wrong format or something else)
                e.message = `${e.message} (file: ${filename})`;
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
     * @returns {string[]}
     * @memberOf TeqFw_Core_Back_Util
     */
    scanNodeModules(path, filename) {
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

    /**
     * Get list of files from directory and all subdirectories.
     *
     * @see https://stackoverflow.com/a/47492545/4073821
     *
     * @param {string} path
     * @returns {string[]}
     * @memberOf TeqFw_Core_Back_Util
     */
    scanRecursively(path) {
        // FUNCS
        const getDirectories = path => readdirSync(path).map(name => join(path, name)).filter(isDirectory);
        const getFiles = path => readdirSync(path).map(name => join(path, name)).filter(isFile);
        const isDirectory = path => statSync(path).isDirectory();
        const isFile = path => statSync(path).isFile();

        // MAIN
        const dirs = getDirectories(path);
        const files = dirs
            .map(dir => scanRecursively(dir))  // go through each directory
            .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays)
        // COMPOSE RESULT
        return files.concat(getFiles(path));
    }
}