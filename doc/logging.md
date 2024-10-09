# TeqFW Logger

The logging mechanism in TeqFW is based on modular components following the principles of Dependency Injection (DI),
enabling seamless substitution of different implementations.

## Overview

Since TeqFW separates JavaScript code into frontend and backend areas, and logging is used on both sides, the
logging interfaces and their base implementations are located in the `./Shared` directory of the codebase.

The logger is injected into objects as a dependency instance (`TeqFw_Core_Shared_Api_Logger$$`), rather than using a
singleton pattern (`Ns_Class$`):

```js
class MyClass {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger - instance
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger, // inject an instance ('$$' at the end of ID)
        }
    ) {}
}
```

This approach ensures that each logger instance, injected by the Object Container at runtime, is aware of the name of
the object into which it is injected, for context-specific log messages (see
`TeqFw_Core_Shared_App_Di_PostProcessor_Logger`):

```
10/09 08:54:39.578 (info TeqFw_Core_Back_App): All CLI commands have been added.
```

## Key Concepts

### Events

The logger handles three types of events (`TeqFw_Core_Shared_Api_Logger`):

* info
* error
* exception

### DTO (Data Transfer Object)

The log message structure processed by the logger (`TeqFw_Core_Shared_Dto_Log`) includes the following fields:

```js
class Dto {
    static namespace = NS;
    /** @type {Date} */
    date;
    /** @type {boolean} */
    isError;
    /** @type {string} */
    message;
    /** @type {Object} */
    meta;
    /**
     * Namespace for the message source.
     * @type {string}
     */
    source;
}
```

### Message Queue

Each log message is timestamped and stored in a global queue shared by all logger instances across the application.

### Transport

The transport layer is a runtime object that implements the `TeqFw_Core_Shared_Api_Logger_Transport` interface,
responsible for processing messages from the global queue.

### Plugin Descriptor

The TeqFW plugin descriptor (`./teqfw.json`) defines the mapping between interfaces and their implementations. This
configuration guides the DI container in determining which implementation to inject for each specific interface.

An example from the [`teqfw.json`](https://raw.githubusercontent.com/teqfw/core/refs/heads/main/teqfw.json) file shows
these mappings:

```json
{
  "@teqfw/di": {
    "replaces": {
      "shared": {
        "TeqFw_Core_Shared_Api_Logger": "TeqFw_Core_Shared_Logger",
        "TeqFw_Core_Shared_Api_Logger_Transport": "TeqFw_Core_Shared_Logger_Transport_Console"
      }
    }
  }
}
```