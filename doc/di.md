# The configuration of DI

## The plugin descriptor

The core-plugin defines the base rules to configure DI in other teq-plugins. Every teq-plugin should define some
configuration rules in the plugin descriptor (`./teqfw.json` file), at least for the `@teqfw/di/autoload` section.

```json
{
  "@teqfw/di": {
    "autoload": {},
    "proxy": {},
    "replaces": {}
  }
}
```

See `TeqFw_Core_Back_App_A_Init_Di`.

### Autoload

The rules to convert the dependency id to the path to the source file:

```json
{
  "@teqfw/di": {
    "autoload": {
      "ns": "TeqFw_Core",
      "path": "./src",
      "ext": "mjs"
    }
  }
}
```

### Proxy

The rules to wrap the objects on the postprocessing stage:

```json
{
  "@teqfw/di": {
    "proxy": {
      "back": {
        "Origin_Back_Mod": "App_Back_Di_Proxy_Origin_Back_Mod"
      },
      "front": {},
      "shared": {}
    }
  }
}
```

### Replaces

The rules to replace the depIds on the preprocessing stage (interface => implementation):

```json
{
  "@teqfw/di": {
    "replaces": {
      "back": {
        "Origin_Back_Mod": "App_Back_Di_Proxy_Origin_Back_Mod"
      },
      "front": {},
      "shared": {}
    }
  }
}
```