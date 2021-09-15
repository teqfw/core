# @teqfw/core

This package contains backend application to scan and registry teq-plugins and is used in Tequila Framework based
projects. Core-plugin contains CLI [commander](https://github.com/tj/commander.js) and adds plugin's commands to the
application. Also, core-plugin loads local configuration from `./cfg/local.json` (if file exist).

## Install

```shell
$ npm i @teqfw/core --save 
```

## Bootstrap

Create script `./bin/tequila.mjs` in your project and place this code inside:

```ecmascript 6
#!/usr/bin/env node
'use strict';
import {dirname, join} from 'path';
import Container from '@teqfw/di';

/* Resolve paths to main folders */
const url = new URL(import.meta.url);
const script = url.pathname;
const bin = dirname(script);  // current folder (./bin)
const root = join(bin, '..'); // project root (./)

try {
    /* Create and setup DI container */
    /** @type {TeqFw_Di_Shared_Container} */
    const container = new Container();
    const pathDi = join(root, 'node_modules/@teqfw/di/src');
    const pathCore = join(root, 'node_modules/@teqfw/core/src');
    container.addSourceMapping('TeqFw_Di', pathDi, true, 'mjs');
    container.addSourceMapping('TeqFw_Core', pathCore, true, 'mjs');

    /* Request Container to construct App then run it */
    /** @type {TeqFw_Core_Back_App} */
    const app = await container.get('TeqFw_Core_Back_App$');
    await app.init({path: root, version: '0.1.0'});
    await app.run();
} catch (e) {
    console.error('Cannot create or run TeqFW application.');
    console.dir(e);
}
```

## Core commands

These command are in the core-plugin:

```shell
$ node ./bin/tequila.mjs help
Usage: tequila [options] [command]

Options:
  -h, --help                   display help for command

Commands:
  core-startup-logs            print out startup logs from the application core.
  core-version                 get version of the application.
  help [command]               display help for command

```



## Add `./teqfw.json`

You need to add `./teqfw.json` to your project (near `./package.json`) with "namespace-to-filesystem" mapping to use
dependency injection (@teqfw/di):

```json
{
  "di": {
    "autoload": {
      "ns": "Vendor_Plugin",
      "path": "./src"
    }
  }
}
```



## Add command

Create es6-module `./src/Back/Cli/Cmd.mjs` with factory that creates command data (see `TeqFw_Core_Back_Api_Dto_Command`):

```ecmascript 6
const NS = 'Vendor_Plugin_Back_Cli_Cmd';
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @constructor
 * @memberOf Vendor_Plugin_Back_Cli_Cmd
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command#Factory$'];

    // DEFINE INNER FUNCTIONS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Vendor_Plugin_Back_Cli_Cmd
     */
    const action = async function () {
        console.log('Command is executed.');
    };
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = 'app';
    res.name = 'command';
    res.desc = 'command description.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export default Factory;
```

Register this command in project's `./teqfw.json`:

```json
{
  "@teqfw/core": {
    "commands": [
      "Vendor_Plugin_Back_Cli_Cmd"
    ]
  }
}
```

New command is appeared in the application:

```shell
$ node ./bin/tequila.mjs help
Usage: tequila [options] [command]
...
Commands:
  app-commad                 command description.
  ...
```
