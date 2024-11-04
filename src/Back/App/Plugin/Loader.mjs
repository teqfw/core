/**
 * Scan project files and get all teq-plugins (with `teqfw.json` descriptors).
 * Load data from `project.json` and `teqfw.json` and arrange plugins by dependencies.
 * Store plugins descriptors in the Plugins Registry (TeqFw_Core_Back_Api_Plugin_Registry).
 */
export default class TeqFw_Core_Back_App_Plugin_Loader {
    /**
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     * @param {TeqFw_Core_Back_App_Plugin_Loader_A_Scan|function} scan
     * @param {TeqFw_Core_Shared_Logger} logger -  instance, not interface! we don't load replaces yet
     * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
     * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory} fItem
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di} dtoDiDesc
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy} dtoDiProxy
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace} dtoDiReplace
     * @param {typeof TeqFw_Core_Shared_Enum_Sphere} SPHERE
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Util_Cast$: cast,
            'TeqFw_Core_Back_App_Plugin_Loader_A_Scan.default': scan,
            TeqFw_Core_Shared_Logger$$: logger, // inject the implementation
            TeqFw_Core_Back_Api_Plugin_Registry$: registry,
            'TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item.Factory$': fItem,
            TeqFw_Core_Back_Plugin_Dto_Desc_Di$: dtoDiDesc,
            TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy$: dtoDiProxy,
            TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace$: dtoDiReplace,
            TeqFw_Core_Shared_Enum_Sphere$: SPHERE,
        }
    ) {
        // INSTANCE METHODS

        /**
         * Scan packages and register TeqFW plugins into the registry.
         * @param {String} root
         * @returns {Promise<TeqFw_Core_Back_Api_Plugin_Registry>}
         */
        this.exec = async function (root) {
            // FUNCS

            /**
             * Extract TeqFW data from `package.json` & `teqfw.json`.
             * @param {Object<string, TeqFw_Core_Back_App_Plugin_Loader_A_Scan.Dto>} scanned
             * @returns {Promise<TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]>}
             */
            async function extractPluginData(scanned) {
                // FUNCS

                /**
                 * The sample:
                 * @param {Object} spheres
                 * @returns {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Proxy.Dto[]}
                 */
                function composeDiProxy(spheres) {
                    const res = [];
                    if (spheres && Array.isArray(Object.keys(spheres)))
                        for (const key of Object.keys(spheres)) {
                            const sphere = cast.enum(key, SPHERE); // back, front, shared
                            if (sphere) {
                                // there is a valid sphere in the config
                                const items = spheres[key];
                                if (Array.isArray(Object.keys(items))) {
                                    for (const depId of Object.keys(items)) {
                                        if (typeof depId === 'string') {
                                            const dto = dtoDiProxy.createDto();
                                            dto.from = depId;
                                            dto.sphere = sphere;
                                            dto.to = items[depId];
                                            res.push(dto);
                                        }
                                    }
                                }
                            }
                        }
                    return res;
                }

                /**
                 * @param {Object<string, Object>} spheres
                 * @returns {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace.Dto[]}
                 */
                function composeDiReplaces(spheres) {
                    // FUNCS
                    /**
                     * Return 'true' if all keys are from ['back', 'front','shared'] array.
                     * @param {string[]} keys
                     * @returns {boolean}
                     */
                    function isSpheres(keys) {
                        for (const key of keys)
                            if (!cast.enum(key, SPHERE)) return false;
                        return true;
                    }

                    /**
                     * Parse old style of the replaces definition (namespaces => spheres).
                     * @param {Object<string, Object>} replaces
                     * @returns {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Replace.Dto[]}
                     */
                    function oldStyle(replaces) {
                        logger.error(`This style of replaces definition is deprecated, please use "spheres => namespaces" format.`);
                        const res = [];
                        for (const orig of Object.keys(replaces)) {
                            const one = replaces[orig];
                            if (typeof one === 'string') {
                                // {from: to}
                                const dto = dtoDiReplace.createDto();
                                dto.from = orig;
                                dto.sphere = SPHERE.SHARED;
                                dto.to = one;
                                res.push(dto);
                            } else if (typeof one === 'object') {
                                // {from: {back: to, front: to}}
                                for (const key of Object.keys(one)) {
                                    const dto = dtoDiReplace.createDto();
                                    dto.from = orig;
                                    dto.sphere = SPHERE[key.toUpperCase()];
                                    dto.to = one[key];
                                    res.push(dto);
                                }
                            }
                        }
                        return res;
                    }

                    // MAIN
                    const res = [];
                    if (spheres && Array.isArray(Object.keys(spheres)))
                        if (!isSpheres(Object.keys(spheres)))
                            return oldStyle(spheres);
                        else {
                            // new style (spheres => namespaces)
                            for (const key of Object.keys(spheres)) {
                                const sphere = cast.enum(key, SPHERE); // back, front, shared
                                const items = spheres[key];
                                if (Array.isArray(Object.keys(items))) {
                                    for (const depId of Object.keys(items)) {
                                        if (typeof depId === 'string') {
                                            const dto = dtoDiReplace.createDto();
                                            dto.from = depId;
                                            dto.sphere = sphere;
                                            dto.to = items[depId];
                                            res.push(dto);
                                        }
                                    }
                                }
                            }
                        }
                    return res;
                }

                // MAIN
                const res = [];
                for (const one of Object.values(scanned)) {
                    logger.info(`    ${one.path}`);
                    const item = fItem.create();
                    item.deps = (typeof one.package?.dependencies === 'object')
                        ? Object.keys(one.package.dependencies) : [];
                    item.name = one.package.name;
                    item.path = one.path;
                    item.teqfw = one.teqfw;
                    const desc = dtoDiDesc.createDto(item.teqfw[DEF.SHARED.NAME_DI]);
                    const replaces = item.teqfw[DEF.SHARED.NAME_DI]?.['replaces'];
                    const proxy = item.teqfw[DEF.SHARED.NAME_DI]?.['proxy'];
                    desc.replaces = composeDiReplaces(replaces);
                    desc.proxy = composeDiProxy(proxy);
                    item.teqfw[DEF.SHARED.NAME_DI] = desc;
                    res.push(item);
                }
                return res;
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
            logger.info(`Scan '${root}' for teq-plugins.`);
            const scanData = await scan(root);
            const items = await extractPluginData(scanData);
            const names = [];
            let appName;
            for (const item of items) {
                registry.set(item.name, item);
                names.push(item.name);
                if (item.path === root) appName = item.name;
            }
            // set root plugin name as application name
            registry.setAppName(appName);
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
            logger.info(`Total '${items.length}' teq-plugins are found.`);
            return registry;
        };
    }
}
