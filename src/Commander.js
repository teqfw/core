/**
 * Application commander.
 *
 * @namespace TeqFw_Core_App_Commander
 */
"use strict";

/* ==============================================================================
 * Import.
 * =========================================================================== */
/* core modules (sample: "path") */
/* project modules (from "node_modules"; sample: "express") */
/* module sources (from this module filesystem); "./folder/script" */

/* ==============================================================================
 * TeqFW object composition.
 * =========================================================================== */
/**
 * Application commander.
 *
 * @return {TeqFw_Core_App_Commander}
 * @class
 */
function TeqFw_Core_App_Commander() {
    /* Definitions of the object structures */
    /**
     * @typedef {Object} TeqFw_Core_App_Commander.CommandData
     * @property {string} flags
     * @property {string} description
     * @property {Function} action
     */

    /* Private properties of the object */
    const _commander = require("commander");

    /* Public properties of the object */
    this.prop_pub = {};

    /* Private methods of the object */
    function func_priv() {
    }

    /* Public methods of the object */

    /**
     *
     * @param spec
     */
    this.addCommand = (spec) => {
        const {flags, description, action} = spec;
        _commander.option(flags, description, action);
    };

    /**
     * Set application version.
     *
     * @param {string} version
     */
    this.setVersion = (version) => {
        _commander.version(version, "-v, --version");
    };

    /**
     * Run commander and execute requested commands.
     */
    this.run = () => {
        _commander.parse(process.argv);
        if (!process.argv.slice(2).length) {
            _commander.outputHelp();
        }
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}


/* ==============================================================================
 * Module exports.
 * =========================================================================== */
module.exports = TeqFw_Core_App_Commander;