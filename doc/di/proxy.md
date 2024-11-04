# The proxy postprocessing in DI

Any object created by the container can be wrapped with other object to modify existing functionality (
see `TeqFw_Core_Shared_App_Di_PostProcessor_Proxy`).

## The plugin descriptor

There are 3 spheres of proxy postprocessing: back, front and shared.

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

## The wrapper API

Every wrapper must implement `TeqFw_Core_Shared_Api_Di_Proxy` interface:

```js
/**
 * @extends Plugin_Back_Obj
 * @implements TeqFw_Core_Shared_Api_Di_Proxy
 */
export default class App_Back_Di_Proxy_Plugin_Back_Obj {

    constructor() {
        /**
         * @param {Plugin_Back_Obj} origin
         * @returns {Plugin_Back_Obj}
         */
        this.wrapOrigin = function (origin) {
            // FUNCS
            async function readSalt(opts) {
                const {trx, userBid} = opts;
                // make your own logic here
                return origin.readSalt(opts);
            }

            // MAIN
            // overwrite origin methods
            return Object.assign({}, origin, {readSalt});
        };
    }
}
```