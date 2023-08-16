/**
 * Plugin scanner.
 */
export default class TeqFw_Core_Back_Mod_Init_Plugin {
    /**
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Di_Back_Plugin_Scanner} scanner
     * @param {TeqFw_Core_Shared_Logger} logger -  instance, not interface!
     * @param {TeqFw_Core_Back_Mod_Init_Plugin_Registry} registry
     * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory} fItem
     * @param {TeqFw_Di_Back_Api_Dto_Plugin_Desc.Factory} fDiDesc
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Di_Back_Plugin_Scanner$: scanner,
            TeqFw_Core_Shared_Logger$$: logger,
            TeqFw_Core_Back_Mod_Init_Plugin_Registry$: registry,
            ['TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory$']: fItem,
            ['TeqFw_Di_Back_Api_Dto_Plugin_Desc.Factory$']: fDiDesc,
        }) {
        // MAIN
        logger.setNamespace(this.constructor.name);

        // INSTANCE METHODS

        /**
         * Scan packages and register TeqFW plugins into the registry.
         * @param {String} root
         * @returns {Promise<TeqFw_Core_Back_Mod_Init_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // FUNCS

            /**
             * @param {Object.<string, TeqFw_Di_Back_Api_Dto_Scanned>} scanItems
             * @returns {Promise<TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]>}
             */
            async function getPlugins(scanItems) {
                // FUNCS

                /**
                 * Check does 'package.json' exist, read content, parse and return data if 'yes'.
                 * @param {TeqFw_Di_Back_Api_Dto_Scanned} scanItem
                 * @returns {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item}
                 */
                function extractPluginItem(scanItem) {
                    const res = fItem.create();
                    let msg = `Teq-module is found in '${scanItem.path}'`;
                    res.deps = (typeof scanItem.package?.dependencies === 'object')
                        ? Object.keys(scanItem.package.dependencies) : [];
                    res.name = scanItem.package.name;
                    res.path = scanItem.path;
                    res.teqfw = scanItem.teqfw;
                    res.teqfw[DEF.MOD_DI.NAME] = fDiDesc.create(res.teqfw[DEF.MOD_DI.NAME]);
                    logger.info(`${msg}.`);
                    return res;
                }

                // MAIN
                const result = [];
                for (const scanItem of Object.values(scanItems)) {
                    const pluginItem = extractPluginItem(scanItem);
                    result.push(pluginItem);
                }
                return result;
            }

            /**
             * Sort plugins by level according to dependencies.
             *
             * @param {string[]} names
             * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items
             */
            function composeLevels(names, items) {
                // VARS
                const successors = {}; // {core => [web, i18n, vue, ...]}
                const weights = {};

                // FUNCS
                /**
                 * Recursive function to update plugins weights in hierarchy.
                 * 1 - plugin has no deps, 2 - plugin has one dep's level below, ...
                 *
                 * Circular dependencies should be resolved on NPM level.
                 *
                 * @param {string} name
                 * @param {number} weight
                 */
                function setWeights(name, weight) {
                    if (weights[name]) weight = weights[name] + 1;
                    if (successors[name])
                        for (const one of successors[name]) {
                            if (weights[one]) {
                                setWeights(one, weights[one] + 1);
                            } else {
                                setWeights(one, 1);
                            }
                        }
                    weights[name] = weight;
                }

                // MAIN
                // collect package successors
                for (const one of items) {
                    const name = one.name;
                    for (const dep of one.deps) {
                        if (!successors[dep]) successors[dep] = [];
                        successors[dep].push(name);
                    }
                }
                for (const one of items) setWeights(one.name, 1);
                // convert weights to levels
                const result = {};
                for (const name of Object.keys(weights)) {
                    const weight = weights[name];
                    if (!result[weight]) result[weight] = [];
                    result[weight].push(name);
                }
                return result;
            }

            // MAIN
            logger.info(`Scan '${root}' for teq-modules.`);
            const scanData = await scanner.scanFilesystem(root);
            const items = await getPlugins(scanData);
            const names = [];
            let appName;
            for (const item of items) {
                registry.set(item.name, item);
                names.push(item.name);
                if (item.path === root) appName = item.name;
            }
            // set root plugin name as application name
            registry.setAppName(appName)
            // remove extra deps (not teq-plugins)
            for (const item of items) {
                const all = item.deps;
                const plugins = [];
                for (const one of all)
                    if (names.includes(one)) plugins.push(one);
                item.deps = plugins;
            }
            const levels = composeLevels(names, items);
            registry.setLevels(levels);
            //
            logger.info(`Total '${items.length}' teq-modules are found.`);
            return registry;
        };
    }
}
