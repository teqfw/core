/**
 * Abstraction of proxies to wrap objects.
 *
 * This is documentation only code (not executable).
 *
 * @interface
 */
export default class TeqFw_Core_Shared_Api_Di_Proxy {
    /**
     * @param {*} origin
     * @deprecated
     */
    setOrigin(origin) {}

    /**
     * Wraps the origin object and returns the wrapped object.
     * @param {*} origin
     * @returns {*}
     */
    wrapOrigin(origin) {
        return origin;
    }
}
