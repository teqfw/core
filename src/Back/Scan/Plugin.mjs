/**
 * Plugin scanner.
 */
export default class TeqFw_Core_Back_Scan_Plugin {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Di_Back_Plugin_Scanner} */
        const scanner = spec['TeqFw_Di_Back_Plugin_Scanner$'];
        /** @type {TeqFw_Core_Logger} */
        const logger = spec['TeqFw_Core_Logger$'];
        /** @type {TeqFw_Core_Back_Scan_Plugin_Registry} */
        const registry = spec['TeqFw_Core_Back_Scan_Plugin_Registry$'];
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory} */
        const fItem = spec['TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item#Factory$'];
        /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc.Factory} */
        const fDiDesc = spec['TeqFw_Di_Back_Api_Dto_Plugin_Desc#Factory$'];

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Scan packages and register TeqFW plugins into the registry.
         * @param {String} root
         * @returns {Promise<TeqFw_Core_Back_Scan_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // DEFINE INNER FUNCTIONS

            /**
             * @param {Object.<string, TeqFw_Di_Back_Api_Dto_Scanned>} scanItems
             * @returns {Promise<TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]>}
             */
            async function getPlugins(scanItems) {
                // DEFINE INNER FUNCTIONS

                /**
                 * Check does 'package.json' exist, read content, parse and return data if 'yes'.
                 * @param {TeqFw_Di_Back_Api_Dto_Scanned} scanItem
                 * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item}
                 */
                function extractPluginItem(scanItem) {
                    const res = fItem.create();
                    let msg = `Teq-module is found in '${scanItem.path}'`;
                    res.name = scanItem.package.name;
                    res.path = scanItem.path;
                    res.teqfw = scanItem.teqfw;
                    res.teqfw[DEF.MOD_DI.DESC_NODE] = fDiDesc.create(res.teqfw[DEF.MOD_DI.DESC_NODE]);
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
