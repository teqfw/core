import $commander from "commander";

/**
 * Application commander (wrapper for inner `_commander`).
 */
export default class TeqFw_Core_App_Commander {
    constructor(spec) {
        /**
         * Command data to add to the commander.
         *
         * @typedef {Object} TeqFw_Core_App_Commander.CommandData
         * @property {string} flags - CLI options (`--core-server-start`).
         * @property {string} description - Console help for the command: "Start application's web server.".
         * @property {Function} action - Function to be called to perform requested action.
         */

        /** @type {TeqFw_Core_App_Instance} */
        const _app = spec.TeqFw_Core_App_Instance$;

        /**
         * Inner commander.
         */
        const _commander = $commander;


        /**
         * Wrapper to add command to inner `_commander`.
         *
         * @param {TeqFw_Core_App_Commander.CommandData} spec
         * @memberOf TeqFw_Core_App_Commander.prototype
         */
        this.addCommand = function ({flags, description, action}) {
            _commander.option(flags, description, action);
        };

        /**
         * Set application version.
         *
         * @param {string} version
         * @memberOf TeqFw_Core_App_Commander.prototype
         */
        this.setVersion = function (version) {
            _commander.version(version, "-v, --version");
        };

        /**
         * Run inner `_commander` and perform requested commands.
         *
         * @memberOf TeqFw_Core_App_Commander.prototype
         */
        this.run = function () {
            _commander.parse(process.argv);
            if (!process.argv.slice(2).length) {
                _commander.outputHelp();
                _app.stop().then(() => {
                    /* do nothing*/
                });
            }
        };
    }
}