"use strict";

/**
 * Application commander (wrapper for inner `_commander`).
 *
 * @return {TeqFw_Core_App_Commander}
 * @param {TeqFw_Core_App} TeqFw_Core_App
 * @constructor
 */
function TeqFw_Core_App_Commander(
    TeqFw_Core_App
) {
    /**
     * Command data to add to the commander.
     *
     * @typedef {Object} TeqFw_Core_App_Commander.CommandData
     * @property {string} flags - CLI options (`--core-server-start`).
     * @property {string} description - Console help for the command: "Start application's web server.".
     * @property {Function} action - Function to be called to perform requested action.
     */

    /** @type {TeqFw_Core_App} */
    const _app = TeqFw_Core_App;

    /**
     * Inner commander.
     */
    const _commander = require("commander");


    /**
     * Wrapper to add command to inner `_commander`.
     * @param {CommandData} spec
     */
    this.addCommand = function ({flags, description, action}) {
        _commander.option(flags, description, action);
    };

    /**
     * Set application version.
     *
     * @param {string} version
     */
    this.setVersion = function (version) {
        _commander.version(version, "-v, --version");
    };

    /**
     * Run inner `_commander` and perform requested commands.
     */
    this.run = function () {
        _commander.parse(process.argv);
        if (!process.argv.slice(2).length) {
            _commander.outputHelp();
            _app.stop().then((boo) => {
                // do nothing
                const bp = 1;
            });
        }
    };

    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Commander;