import $fs from 'fs';
import $path from 'path';

class TeqFw_Core_App_Plugin_Scan_Item {
    /**
     * Name of the plugin init class.
     * @type {String}
     */
    initClass;
    /**
     * Name of the package.
     * @type {String}
     */
    name;
    /**
     * Path to the root of the package.
     * @type {String}
     */
    path;
    /**
     * 'teqfw' part of the 'package.json'.
     * @type {TeqFw_Core_App_Plugin_Package_Data}
     */
    teqfw;
}

class TeqFw_Core_App_Plugin_Scan {
    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Di_Util_PluginScanner} */
        const scanner = spec['TeqFw_Di_Util_PluginScanner$']; // singleton
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // singleton
        /** @type {TeqFw_Core_App_Plugin_Registry} */
        const registry = spec['TeqFw_Core_App_Plugin_Registry$'];   // singleton
        /** @type {typeof TeqFw_Core_App_Plugin_Package_Data} */
        const Data = spec['TeqFw_Core_App_Plugin_Package_Data#'];  // class
        /** @type {typeof TeqFw_Core_App_Plugin_Package_Data_Autoload} */
        const DAutoload = spec['TeqFw_Core_App_Plugin_Package_Data#Autoload'];  // class

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Scan packages and register TeqFW plugins in the registry.
         * @param {String} root
         * @returns {Promise<TeqFw_Core_App_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param {Object.<string, TeqFw_Di_Api_ScanData>} scanItems
             * @returns {Promise<TeqFw_Core_App_Plugin_Scan_Item[]>}
             */
            async function getPlugins(scanItems) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Check does 'package.json' exist, read content, parse and return data if 'yes'.
                 * @param {TeqFw_Di_Api_ScanData} scanItem
                 * @returns {TeqFw_Core_App_Plugin_Scan_Item}
                 */
                function extractPluginItem(scanItem) {
                    const result = new TeqFw_Core_App_Plugin_Scan_Item();
                    let msg = `Teq-module is found in '${scanItem.path}'`;
                    result.name = scanItem.package.name;
                    result.path = scanItem.path;
                    result.teqfw = scanItem.teqfw;
                    result.teqfw.autoload = Object.assign(new DAutoload(), result.teqfw.autoload);
                    const autoload = result.teqfw.autoload;
                    if (autoload && autoload.ns && autoload.path) {
                        const srcRoot = $path.join(result.path, autoload.path);
                        const ext = autoload.ext ?? 'mjs';
                        const filepath = $path.join(srcRoot, 'Plugin', `Init.${ext}`);
                        if ($fs.existsSync(filepath)) {
                            result.initClass = `${autoload.ns}_Plugin_Init$`;
                            msg = `${msg} (pluggable)`;
                        }
                    }
                    logger.info(`${msg}.`);
                    return result;
                }

                // MAIN FUNCTIONALITY
                const result = [];
                for (const [path, scanItem] of Object.entries(scanItems)) {
                    const pluginItem = extractPluginItem(scanItem);
                    result.push(pluginItem);
                }
                return result;
            }

            // MAIN FUNCTIONALITY
            logger.info(`Scan '${root}' for teq-modules.`);
            const scanData = await scanner.scanFilesystem(root);
            const items = await getPlugins(scanData);
            for (const item of items) registry.set(item.name, item);
            logger.info(`Total '${items.length}' teq-modules are found.`);
            return registry;
        };

        /**
         * @returns {TeqFw_Core_App_Plugin_Registry}
         */
        this.getRegistry = function () {
            return registry;
        };
    }

}

export {
    TeqFw_Core_App_Plugin_Scan as default,
    TeqFw_Core_App_Plugin_Scan_Item as Item,
};
