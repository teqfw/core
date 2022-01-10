# @teqfw/core: releases

# 0.8.0

* Events related interfaces.
* Backend application UUID.
* Restructure directories and files.

# 0.7.1

* Separate interfaces to sync and async in `./Shared/Api/`.
* New model `TeqFw_Core_Shared_Mod_Map`.

# 0.7.0

* Move source code areas in the core from `@teqfw/di`.
* Fix namespaces scanning when namespace is omitted in `teqfw.json`.
* DTO module interface (`TeqFw_Core_Shared_Api_Factory_Dto_IMeta`).
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
* add path-to-name function to plugin registry (`TeqFw_Core_Back_App_Scan_Plugin_Registry`);
* add backend only utils (`TeqFw_Core_Back_Util`);
* interface for actions (`TeqFw_Core_Shared_Api_IAction`);
