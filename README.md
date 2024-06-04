# @teqfw/core

The base plugin for any TeqFw-application. It allows building Node.js applications and running console commands.

## Disclaimer

This package is a part of the [Tequila Framework](https://flancer32.com/what-is-teqfw-f84ab4c66abf) (TeqFW). The TeqFW
is currently in an early stage of development and should be considered unstable. It may change rapidly, leading to
breaking changes without prior notice. Use it at your own risk. Please note that contributions to the project are
welcome, but they should only be made by those who understand and accept the risks of working with an unstable
framework.

## Overview

This `teq`-plugin contains backend application to scan and registry other `teq`-plugins and is used in Tequila Framework
based projects. `core`-plugin contains CLI [commander](https://github.com/tj/commander.js) and adds plugin's commands to
the application. Also, core-plugin loads local configuration from `./cfg/local.json` (if the file exist).

### Namespace

This plugin uses `TeqFw_Core` namespace.

## Install

```shell
$ npm i @teqfw/core --save 
```

## Namespace

This plugin uses `TeqFw_Core` namespace.

## CLI commands

These commands are in the plugin:

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

## `./cfg/local.json`

[DTO](src/Back/Plugin/Dto/Config/Local.mjs) for `@teqfw/web` node.

```json
{
  "@teqfw/core": {
    "devMode": false
  }
}
```

## `teqfw.json`

[DTO](src/Back/Plugin/Dto/Desc.mjs) for `@teqfw/core` nodes in `teq`-plugins descriptors.

```json
{
  "@teqfw/core": {
    "commands": ["Ns_Mod"],
    "plugin": {
      "onInit": "Ns_Mod",
      "onStop": "Ns_Mod"
    }
  }
}
```

## Usage

### bootstrap

Create script `./bin/tequila.mjs` to make TeqFW app from your project. Place this code inside:

```ecmascript 6
#!/usr/bin/env node
'use strict';
/** Create and run teq-app as a Node.js program. */
// IMPORT
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import teq from '@teqfw/core';

// VARS
/* Resolve path to the root folder. */
const url = new URL(import.meta.url);
const script = fileURLToPath(url);
const bin = dirname(script);
const path = join(bin, '..');

// MAIN
/* Run the teq-app from the given root path. */
teq({path}).catch((e) => console.error(e));
```

### add `./teqfw.json`

You need to add `./teqfw.json` to your project (near `./package.json`) with "namespace-to-filesystem" mapping to use
dependency injection (`@teqfw/di`). Choose namespace for your sources (`Vendor_Plugin`) and map it to the folder with
sources (`./src'):

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

### add command

Create es6-module `./src/Back/Cli/Cmd.mjs` with factory that creates command data (
see `TeqFw_Core_Back_Api_Dto_Command`):

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
    // DEPS
    /** @type {TeqFw_Core_Back_Api_Dto_Command.Factory} */
    const fCommand = spec['TeqFw_Core_Back_Api_Dto_Command.Factory$'];

    // FUNCS
    /**
     * Command action.
     * @returns {Promise<void>}
     * @memberOf Vendor_Plugin_Back_Cli_Cmd
     */
    const action = async function () {
        console.log('Command is executed.');
    };
    Object.defineProperty(action, 'namespace', {value: NS});

    // COMPOSE RESULT
    const res = fCommand.create();
    res.realm = 'app';
    res.name = 'command';
    res.desc = 'command description.';
    res.action = action;
    return res;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'namespace', {value: NS});
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
