"use strict";

/**
 * Routes registry for TeqFW Web Server.
 *
 * @return {TeqFw_Core_App_Registry_Server_Realm}
 * @constructor
 */
function TeqFw_Core_App_Registry_Server_Realm() {
    /* Definitions of the object structures */
    /**
     * @typedef {Object} TeqFw_Core_App_Registry_Server_Realm.RealmData - Realm definition.
     * @property {string} name - Realm name.
     * @property {string} path_to_home_page - Absolute path to home page source (`/.../pub/index.html).
     */

    /**
     * Inner registry to save realms data.
     *
     * @type {Map<string, TeqFw_Core_App_Registry_Server_Realm.RealmData>}
     * @private
     */
    const _registry = new Map();
    /**
     * Contains default realm data.
     *
     * @type {TeqFw_Core_App_Registry_Server_Realm.RealmData}
     */
    let _default_realm;


    /**
     * Save realm data into the registry.
     *
     * @param {TeqFw_Core_App_Registry_Server_Realm.RealmData} spec - Realm definition.
     */
    this.add = function (spec) {
        const {name} = spec;
        _registry.set(name, spec);
    };


    /**
     * Get name of the default realm.
     *
     * @return {string}
     */
    this.getDefaultRealmName = () => {
        return _default_realm.name;
    };

    /**
     * Get one realm by name.
     *
     * @param {string} name - Realm name.
     * @return {TeqFw_Core_App_Registry_Server_Realm.RealmData}
     */
    this.getRealmByName = (name) => {
        return _registry.get(name);
    };

    /**
     * Get names for all realms.
     *
     * @return {string[]}
     */
    this.getRealmsNames = () => {
        return Array.from(_registry.keys());
    };

    /**
     * Set default realm by name.
     *
     * @param {string} name - Realm name.
     * @throws exception if name is not registered yet.
     */
    this.setDefaultRealm = (name) => {
        if (_registry.has(name)) {
            _default_realm = _registry.get(name);
        } else {
            throw `${this.constructor.name}: Cannot set default realm as '${name}'.`;
        }
    };

    /* Object finalization (result) */
    return Object.freeze(this);
}

/* Module exports */
module.exports = TeqFw_Core_App_Registry_Server_Realm;