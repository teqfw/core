# @teqfw/core: releases

# 0.31.0 - TODO

* 

# 0.31.0

* Replaced all JSDoc annotations `@return` with `@returns` for consistency with JSDoc standards.
* Fixed an error in `TeqFw_Core_Back_App_A_Stop_Plugins.act`.
* Introduced a new API for Models: `TeqFw_Core_Shared_Api_Model`.

# 0.30.3

* Disable console output for logging by default.
* New command `core-verbose` to display startup log.
* Initial [documentation](./doc/logging.md) for logger.

# 0.30.2

* Fix the error with logger postprocessor.
* Remove the legacy format for depIds.

# 0.30.1

* Stack trace for exceptions logging.
* Disable debug logging for DI.

# 0.30.0

* New format for dependency IDs in @teqfw/di.

# 0.24.0

* Add the Launcher (`TeqFw_Core_Back_Launcher`).

# 0.23.0

* The method `exception(e)` is added to `TeqFw_Core_Shared_Api_Logger`.
* The cast utils module uses the class notation in the 'Back' space.

# 0.22.0

* `TeqFw_Core_Back_Util_File` is added.

# 0.21.1

* Fix the wrong versioning.

# 0.21.0

* `TeqFw_Core_Shared_Api_Act` is added instead of `TeqFw_Core_Shared_Api_Action` & `TeqFw_Core_Shared_Api_Action_Async`.
* Some shared defaults are moved to `@teqfw/web` plugin (`DIR_SRC_`).
* Class based casting utilities (`TeqFw_Core_Shared_Util_Cast`).
* Extract code from `TeqFw_Core_Back_App` into `TeqFw_Core_Back_App_A_Init_*` modules.
* New `TeqFw_Core_Shared_App_Di_PostProcessor_Proxy` preprocessor & `TeqFw_Core_Shared_Api_Di_Proxy` interface.
* New `@teqfw/di.proxy` node in `teqfw.json`.

# 0.20.1

* New DI initialization (parser, pre-, post-processors).
* Interfaces replaces modification (pre-processor).
* The post-processor chunk for loggers.

# 0.20.0

* These changes are related to the new architecture of the `@teqfw/di` package.

# 0.11.0

* Allow to `TeqFw_Core_Shared_Util_Format.dateTimeForLog` be called w/o parameters.
* Improve logging format.

# 0.10.0

* `TeqFw_Core_Back_Util_Cast` is added.
* `TeqFw_Core_Shared_Util_Cast.castBin` is added.
* `binToHex` and `hexToBin` are added to `TeqFw_Core_Shared_Util_Codec`.
* Formatting is improved in `TeqFw_Core_Shared_Logger_Transport_Console`.

# 0.9.0

* Load backend UUID from a file.
* Use `node:crypto` instead of `uuid` package.
* Move away events from the `core`.
* Rename `..._Api_IName` interfaces to `..._Api_Name`.
* Add `TeqFw_Core_Shared_Util_Probe.deepFreeze`.
* Remove `TeqFw_Core_Shared_Util`.
* Change `TeqFw_Core_Back_Config` object.
* Change logging principles.
* Clean up events.
* Move PID file processing from `web` to `core`.
* Change old-styled DTOs.

# 0.8.0

* Events related interfaces.
* Backend application UUID.
* Move app startup code into './Init/' space.
* Standalone logger for app startup.
* Logs transport interface.
* Restructure directories and files.
* Remove `TeqFw_Core_Back_Cli_StartupLog`.

# 0.7.1

* Separate interfaces to sync and async in `./Shared/Api/`.
* New model `TeqFw_Core_Shared_Mod_Map`.

# 0.7.0

* Move source code areas in the core from `@teqfw/di`.
* Fix namespaces scanning when namespace is omitted in `teqfw.json`.
* DTO module interface (`TeqFw_Core_Shared_Api_Factory_Dto_Meta`).
* New util `TeqFw_Core_Shared_Util_BeforeAfter`.
* Date cast function.
* Pause/unfreeze logs output on reset.

# 0.6.0

* Cast functions to use in DTOs.
* Bind to di-plugin areas.
* `./Shared/` area is added.
* Test units for cast functions.
* Recursive files scanner.

# 0.5.0

* docs for plugin's teq-descriptor;
* fix errors stealing in `TeqFw_Core_Back_App`;
* use `@teqfw/di.replace` in `./teqfw.json` as an object and not as an array;
* fix double initialization for plugins;
* add path-to-name function to plugin registry (`TeqFw_Core_Back_Api_Plugin_Registry`);
* add backend only utils (`TeqFw_Core_Back_Util`);
* interface for actions (`TeqFw_Core_Shared_Api_Action`);
