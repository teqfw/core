"use strict";
const $fs = require("fs");

/**
 * Local configuration loader.
 *
 * @param {string} path_local Absolute path to local configuration (DB connection ,etc).
 * @param {TeqFw_Core_App_Logger} logger
 * @return {any}
 */
module.exports = function (path_local, logger) {
    const raw_data = $fs.readFileSync(path_local);
    const result = JSON.parse(raw_data.toString());
    logger.info(`Local configuration is read from '${path_local}'.`);
    return result;
};