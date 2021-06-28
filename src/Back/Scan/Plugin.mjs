/**
 * Plugin scanner.
 */
export default class TeqFw_Core_Back_Scan_Plugin {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Di_Util_PluginScanner} */
        const scanner = spec['TeqFw_Di_Util_PluginScanner$']; // singleton
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$']; // singleton
        /** @type {TeqFw_Core_Back_Scan_Plugin_Registry} */
        const registry = spec['TeqFw_Core_Back_Scan_Plugin_Registry$']; // singleton
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory} */
        const fItem = spec['TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item#Factory$']; // singleton
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload.Factory} */
        const fAutoload = spec['TeqFw_Core_Back_Api_Dto_Plugin_Desc_Autoload#Factory$']; // singleton


        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Scan packages and register TeqFW plugins into the registry.
         * @param {String} root
         * @returns {Promise<TeqFw_Core_Back_Scan_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param {Object.<string, TeqFw_Di_Api_ScanData>} scanItems
             * @returns {Promise<TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]>}
             */
            async function getPlugins(scanItems) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Check does 'package.json' exist, read content, parse and return data if 'yes'.
                 * @param {TeqFw_Di_Api_ScanData} scanItem
                 * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item}
                 */
                function extractPluginItem(scanItem) {
                    const res = fItem.create();
                    let msg = `Teq-module is found in '${scanItem.path}'`;
                    res.name = scanItem.package.name;
                    res.path = scanItem.path;
                    res.teqfw = scanItem.teqfw;
                    res.teqfw.autoload = fAutoload.create(res.teqfw.autoload);
                    logger.info(`${msg}.`);
                    return res;
                }

                // MAIN FUNCTIONALITY
                const result = [];
                for (const scanItem of Object.values(scanItems)) {
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
    }

}
