import $fs from 'fs';
import $path from 'path';

/**
 * Get list of files from directory and all subdirectories.
 *
 * @see https://stackoverflow.com/a/47492545/4073821
 *
 * @param {string} path
 * @returns {Array.<string>}
 */
function TeqFw_Core_App_Util_Back_Scan_FilesRecursively(path) {
    // DEFINE INNER FUNCTIONS
    const isDirectory = path =>
        $fs.statSync(path).isDirectory();
    const getDirectories = path =>
        $fs.readdirSync(path).map(name => $path.join(path, name)).filter(isDirectory);
    const isFile = path =>
        $fs.statSync(path).isFile();
    const getFiles = path =>
        $fs.readdirSync(path).map(name => $path.join(path, name)).filter(isFile);

    // MAIN FUNCTIONALITY
    const dirs = getDirectories(path);
    const files = dirs
        .map(dir => TeqFw_Core_App_Util_Back_Scan_FilesRecursively(dir))  // go through each directory
        .reduce((a, b) => a.concat(b), []); // map returns a 2d array (array of file arrays) so flatten
    // COMPOSE RESULT
    return files.concat(getFiles(path));
}

export {
    TeqFw_Core_App_Util_Back_Scan_FilesRecursively as FilesRecursively,
};
