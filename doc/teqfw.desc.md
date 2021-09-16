# TeqFW descriptor's options

## @teqfw/core

`@teqfw/core` plugin can parse these options of `./teqfw.json` descriptors of teq-plugins:

```json
{
  "@teqfw/core": {
    "commands": [
      "Vnd_Prj_Back_Cli_Command"
    ],
    "plugin": {
      "onInit": "Vnd_Prj_Back_Plugin_Init",
      "onStop": "Vnd_Prj_Back_Plugin_Stop"
    }
  }
}
```

## `commands`

List of identifiers for es6-modules with CLI commands (see `TeqFw_Core_Back_Api_Dto_Command`).

## `plugin`

Es6-modules replacement configuration. One es6-module can be replaced with another one on the sources' loader level.

* `onInit`: identifier for es6-module with plugin's initialization function;
* `onStop`: identifier for es6-module with plugin's finalization function;
