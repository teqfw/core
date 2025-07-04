# @teqfw/core: Releases

## 0.35.0 - Enhanced DI container integration and plugin autoload configuration

- **Unified DI container usage**: replaced `TeqFw_Di_Api_Container` with the concrete `TeqFw_Di_Container` across the codebase for improved consistency and maintainability.
- **Extended plugin autoload configuration**: added support for multiple namespace roots via the new `autoload.extra` property in plugin descriptors, allowing more flexible DI namespace mapping.
- **Updated DI initialization logic**: now explicitly passes the DI container to all plugin and app initialization actions, enhancing clarity and testability.
- **Improved logging during DI setup**: logs all namespace mappings, including new `extra` autoloads, to improve traceability of the plugin resolution process.
- **Refactored `Launcher.mjs` and related app bootstrapping logic**, aligning initialization steps with the updated container and plugin setup API.
- **Minor corrections in documentation comments**, improving clarity and consistency in factory-related modules.

## 0.34.1 - Fix `@teqfw/di` version in the `package.json`

- Fix `@teqfw/di` version in the `package.json`

## 0.34.0 - Refactored dependency injection (DI) container initialization (`node:` prefix)

- **Refactored dependency injection (DI) container initialization**, improving modularity and setup flexibility.
- **Deprecated `TeqFw_Core_Shared_Api_Act`**, replaced with **new `Operation`, `Action`, and `Service` abstractions**
  for better separation of concerns.
- **Deleted outdated `src/Shared/Api/Act.mjs`**, transitioning to the new API structure.
- **Enhanced in-memory store interface (`Store/Memory.js`)**, adding expiration handling and storage integrity
  improvements.
- **Updated DI post-processors and parsers**, aligning with the new dependency handling structure.
- **Improved date handling in `Util/Cast.mjs`**, ensuring better support for different time formats.

## 0.33.0 - Added execution context management interface and improved CRUD methods

* Introduced `TeqFw_Core_Shared_Api_Repo_Context` interface for managing execution context repositories with CRUD
  operations.
* Added `TeqFw_Core_Shared_Api_Store_Memory` for handling in-memory data with key-value storage.
* Enhanced `TeqFw_Core_Shared_Api_Model` with improved CRUD methods and better parameter handling.
* Added `dateISO` utility method in `TeqFw_Core_Shared_Util_Cast` for converting dates to ISO strings.
* Improved documentation across interfaces, including better JSDoc annotations for clarity.
* Refined DTO creation methods with lightweight and entity-specific options.
* Fixed inconsistencies in method return types and improved API stability.
* Expanded test coverage to validate new interfaces and utilities.

## 0.32.0 - API Updates, Proxy Fixes, and JSDoc Improvements

* Added `TeqFw_Core_Back_Api_Convert` interface for converting between Domain DTO and Persistent DTO.
* Enhanced `TeqFw_Core_Shared_App_Di_PostProcessor_Proxy` to handle dependency stack propagation and prevent proxy
  loops.
* Replaced all `@return` annotations with `@returns` for consistency with JSDoc standards.
* Fixed an error in `TeqFw_Core_Back_App_A_Stop_Plugins.act`.
* Disabled console output for logging by default.

# 0.31.0

* Replaced all JSDoc annotations `@return` with `@returns` for consistency with JSDoc standards.
* Fixed an error in `TeqFw_Core_Back_App_A_Stop_Plugins.act`.
* Introduced a new API for Models: `TeqFw_Core_Shared_Api_Model`.
* Added `TeqFw_Core_Back_Api_Convert`.

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
