# @teqfw/core

## Задачи core-плагина:

Предоставить back-приложение, которое выполняет следующие базовые функции:

* инициализация приложения
* выполнение приложением запрошенной команды (CLI)
* завершение приложения

Инициализация приложения включает в себя:

* инициализация базового логгера
* загрузка локальной конфигурации
* сканирование файловой системы загрузка конфигурации teq-плагинов
* конфигурация DI-контейнера (autoload & replacements)
* инициализация teq-плагинов (выполнение init-функция для каждого плагина)
* регистрация команд, предоставляемых плагинами

---

| CAUTION: TeqFW is an unstable project w/o backward compatibility. Use it at your own risk. |
|--------------------------------------------------------------------------------------------|

This `teq`-plugin contains backend application to scan and registry other `teq`-plugins and is used in Tequila Framework
based projects. `core`-plugin contains CLI [commander](https://github.com/tj/commander.js) and adds plugin's commands to
the application. Also, core-plugin loads local configuration from `./cfg/local.json` (if file exist).

## Install

```shell
$ npm i @teqfw/core --save 
```

## Namespace

This plugin uses `TeqFw_Core` namespace.

## CLI commands

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
import {dirname, join} from 'path';
import Container from '@teqfw/di';

/* Resolve paths to main folders */
const url = new URL(import.meta.url);
const script = url.pathname;
const bin = dirname(script);  // current folder (./bin)
const root = join(bin, '..'); // project root (./)

try {
    /* Create and setup DI container */
    /** @type {TeqFw_Di_Api_Container} */
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
