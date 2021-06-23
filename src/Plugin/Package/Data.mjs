/**
 * Structures to describe TeqFW plugin data in 'package.json' file of the npm package.
 */

class TeqFw_Core_Plugin_Package_Data_Autoload {
    /**
     * Extensions for ES6 sources (default: 'mjs').
     * @type {String}
     */
    ext = 'mjs';
    /**
     * Plugn's namespace ('Vendor_Project_Module').
     * @type {String}
     */
    ns;
    /**
     * Path to the root of sources relative to the root of the npm package.
     * @type {String}
     */
    path;
}

class TeqFw_Core_Plugin_Package_Data {
    /** @type {TeqFw_Core_Plugin_Package_Data_Autoload} */
    autoload;
}


export {
    TeqFw_Core_Plugin_Package_Data as default,
    TeqFw_Core_Plugin_Package_Data_Autoload as Autoload,
};
