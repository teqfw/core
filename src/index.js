"use strict";
const NS = "teqfw_core_all";


/** =============================================================================
 * Import.
 * =========================================================================== */
const teqfw_core_all_app = require("commander");
const server = require("./server");


// tmp area to define command functions
let fnCliFoo = function () {
    console.log("Foo is here...");
};

let fnCliBar = function () {
    console.log("Bar is here...");
};

let fnCliBaz = function () {
    console.log("Baz is here...");
};
let fnCliBarBaz = function () {
    console.log("BarBaz is here...");
};

// load modules and configure "program" object
teqfw_core_all_app.version("0.0.1", "-v, --version");
teqfw_core_all_app.option("--foo", "command `Foo`", fnCliFoo);
teqfw_core_all_app.option("--bar", "command `Bar`", fnCliBar);
teqfw_core_all_app.option("--baz", "command `Baz`", fnCliBaz);
teqfw_core_all_app.option("--bar-baz", "command `BarBaz`", fnCliBarBaz);

teqfw_core_all_app.run = function () {
    this.parse(process.argv);
    if (!process.argv.slice(2).length) {
        // noinspection JSUnresolvedFunction
        this.outputHelp();
    }
};

/**
 * Module exports.
 * @public
 */
module.exports = teqfw_core_all_app;

