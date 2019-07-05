"use strict";
/** =============================================================================
 * Import.
 * =========================================================================== */
const express = require("express");
const fs = require("fs");
const path = require("path");

/** =============================================================================
 * Definitions of working elements (constants, variables, functions).
 * =========================================================================== */
const DEF_PORT = 3000;
const PID_FILE_NAME = "./var/server.pid";

let pid;
const cfg = global["teqfw"];
const teqfw_core_all_server = express();

teqfw_core_all_server.get("*", (req, res) => {
    res.send("Hello World!");
});

function run() {
    pid = process.pid;
    const pid_path = path.join(teqfw.path.root, PID_FILE_NAME);
    // write PID to file then start the server
    fs.writeFile(pid_path, pid, (err) => {
        if (err) throw err;
        // PID is wrote => start the server
        this.listen(DEF_PORT, function () {
            console.log(`Example app listening on port ${DEF_PORT}. PID: ${pid}.`);
        });
    });


}

function stop() {
    console.log("Before process killing.");
    process.kill(pid, "SIGINT");
    console.log("After process killing.");
}

teqfw_core_all_server.run = run;
teqfw_core_all_server.stop = stop;

/** =============================================================================
 * Module export.
 * =========================================================================== */
module.exports = teqfw_core_all_server;