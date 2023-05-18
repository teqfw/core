# @teqfw/core: releases

# 0.10.0

* `TeqFw_Core_Back_Util_Cast` is added.
* `TeqFw_Core_Shared_Util_Cast.castBin` is added.
* `binToHex` and `hexToBin` are added to `TeqFw_Core_Shared_Util_Codec`

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
* add path-to-name function to plugin registry (`TeqFw_Core_Back_Mod_Init_Plugin_Registry`);
* add backend only utils (`TeqFw_Core_Back_Util`);
* interface for actions (`TeqFw_Core_Shared_Api_Action`);
