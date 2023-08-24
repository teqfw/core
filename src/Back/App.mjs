/**
 * Backend application itself.
 * @namespace TeqFw_Core_Back_App
 */
// MODULE'S IMPORT
import process from 'node:process';
import {Command} from 'commander/esm.mjs';
import {existsSync, statSync} from 'node:fs';
import {join} from 'node:path';

// MODULE'S INTERFACES
/**
 * @interface
 * @memberOf TeqFw_Core_Back_App
 */
class IApp {
    /**
     * Initialize backend application (load configuration and plugins, init DI container & CLI commander).
     *
     * @param {string} path absolute path to the root of the project files (where ./node_modules/ is placed)
     * @param {string} version version for the application ('0.1.0')
     * @return {Promise<void>}
     */
    async init({path, version}) {}

    /**
     * Run application (perform requested CLI command).
     *
     * @return {Promise<void>}
     */
    async run() {}

    /**
     * Stop processes in all plugins.
     * @returns {Promise<void>}
     */
    async stop() {}
}

// MODULE'S CLASSES
/**
 * Main class to launch application: read modules metadata, initialize parts of app, start the app.
 * @implements TeqFw_Core_Back_App.IApp
 */
export default class TeqFw_Core_Back_App {
    /**
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Back_Plugin_Dto_Desc} dtoDesc
     * @param {TeqFw_Di_Container} container
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Back_App_Plugin_Loader} pluginScan
     * @param {typeof TeqFw_Core_Shared_Enum_Sphere} SPHERE
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Back_Plugin_Dto_Desc$: dtoDesc,
            container: container,
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Back_App_Plugin_Loader$: pluginScan,
            TeqFw_Core_Shared_Enum_Sphere$: SPHERE,
        }) {
        // VARS
        const program = new Command();
        /** @type {TeqFw_Core_Back_Api_Plugin_Registry} */
        let pluginsRegistry;
        /** @type {TeqFw_Core_Shared_Api_Logger} */
        let logger;

        // INSTANCE METHODS

        this.init = async function ({path, version}) {
            // FUNCS

            /**
             * Validate existence of the './node_modules/' directory.
             *
             * @param {string} path
             */
            function checkNodeModules(path) {
                const pathNode = join(path, 'node_modules');
                if (!existsSync(pathNode) || !statSync(pathNode).isDirectory())
                    throw new Error(`Cannot find './node_modules/' in '${path}'.`);
            }

            /**
             * Run 'commander' initialization code for all plugins.
             *
             * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
             * @returns {Promise<void>}
             * @memberOf TeqFw_Core_Back_App.init
             */
            async function initCommander(registry) {
                // FUNCS
                /**
                 * Add single command to the app's commander.
                 *
                 * @param {string} moduleId 'Vendor_Plugin_Back_Cli_Command'
                 * @returns {Promise<void>}
                 * @memberOf TeqFw_Core_Back_App.init.initCommander
                 */
                async function addCommand(moduleId) {
                    try {
                        /** @type {TeqFw_Core_Back_Api_Dto_Command} */
                        const cmd = await container.get(`${moduleId}$`); // get as instance singleton
                        const fullName = (cmd.realm) ? `${cmd.realm}-${cmd.name}` : cmd.name;
                        const act = program.command(fullName)
                            .description(cmd.desc)
                            .action(cmd.action);
                        for (const one of cmd.args) act.argument(one.name, one.description, one.fn, one.defaultValue);
                        for (const one of cmd.opts) act.option(one.flags, one.description, one.fn, one.defaultValue);
                        logger.info(`'${fullName}' command is added.`);
                    } catch (e) {
                        // maybe we can stealth errors for dev mode and re-throw its to live mode
                        logger.error(`Cannot create command using '${moduleId}' factory. Error: ${e.message}`);
                        throw  e;
                    }
                }

                // MAIN
                logger.info('Integrate plugins to the Commander.');
                for (const item of registry.items()) {
                    const desc = dtoDesc.createDto(item.teqfw[DEF.SHARED.NAME]);
                    for (const id of desc.commands) await addCommand(id);
                }
            }

            /**
             * Go through all plugins hierarchy (down to top) and init DI container (router & parser).
             * @param {TeqFw_Di_Container} container
             * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
             */
            function initDiContainer(container, registry) {
                // FUNCS
                /**
                 * Extract autoload data from `@teqfw/di` nodes of descriptors and initialize resolver.
                 * @param {TeqFw_Di_Container} container
                 * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items
                 */
                function initAutoload(container, items) {
                    const resolver = container.getResolver();
                    for (const item of items) {
                        /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                        const desc = item.teqfw[DEF.SHARED.NAME_DI];
                        /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di_Autoload.Dto} */
                        const auto = desc.autoload;
                        const ext = auto.ext ?? 'js';
                        const ns = auto.ns;
                        if (ns) {
                            const path = join(item.path, auto.path);
                            resolver.addNamespaceRoot(ns, path, ext);
                            logger.info(`'${ns}' namespace with default '${ext}' ext is mapped to '${path}'.`);
                        }
                    }
                }

                /**
                 * Extract data from ordered `@teqfw/di` nodes and initialize replacement for objectKeys.
                 * @param {TeqFw_Di_Container} container
                 * @param {TeqFw_Core_Back_Api_Dto_Plugin_Registry_Item[]} items - ordered items
                 */
                function initReplaces(container, items) {
                    const preProcessor = container.getPreProcessor();
                    const handlers = preProcessor.getHandlers();
                    // TODO: WF-662
                    /** @type {TeqFw_Di_PreProcessor_Replace|function} */
                    const replace = handlers.find((one) => one.name === 'TeqFw_Di_PreProcessor_Replace');
                    for (const item of items) {
                        /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                        const desc = item.teqfw[DEF.SHARED.NAME_DI];
                        if (Array.isArray(desc?.replaces))
                            for (const one of desc.replaces) {
                                if (
                                    (one.sphere === SPHERE.BACK) ||
                                    (one.sphere === SPHERE.SHARED)
                                )
                                    replace.add(one.from, one.to);
                            }
                    }
                }

                // MAIN
                initAutoload(container, registry.items());
                initReplaces(container, registry.getItemsByLevels());
            }

            /**
             * Set console transport for base logger and create own logger.
             * @param {TeqFw_Di_Container} container
             * @return {Promise<TeqFw_Core_Shared_Api_Logger>}
             */
            async function initLogger(container) {
                /** @type {TeqFw_Core_Shared_Logger_Base} */
                const loggerBase = await container.get('TeqFw_Core_Shared_Logger_Base$');
                /** @type {TeqFw_Core_Shared_Logger_Transport_Console} */
                const toConsole = await container.get('TeqFw_Core_Shared_Logger_Transport_Console$');
                loggerBase.setTransport(toConsole);
                /** @type {TeqFw_Core_Shared_Logger} */
                return await container.get('TeqFw_Core_Shared_Logger$$');
            }

            /**
             * Go through plugins hierarchy (down to top) and run init functions.
             * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
             * @return {Promise<void>}
             */
            async function initPlugins(registry) {
                // MAIN
                logger.info('Initialize plugins.');
                const plugins = registry.getItemsByLevels();
                for (const item of plugins) {
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc.Dto} */
                    const desc = item.teqfw[DEF.SHARED.NAME];
                    if (desc?.plugin?.onInit) {
                        /** @type {Function} */
                        let fn;
                        try {
                            fn = await container.get(`${desc.plugin.onInit}$$`); // as new instance
                        } catch (e) {
                            logger.error(`Cannot create plugin init function using '${desc.plugin.onInit}' factory`
                                + ` or run it. Error: ${e.message}`);
                        }
                        if (typeof fn === 'function') {
                            await fn();
                            logger.info(`Plugin '${item.name}' is initialized.`);
                        }
                    }
                }
            }

            // MAIN
            logger = await initLogger(container);
            logger.setNamespace(this.constructor.name);
            // check installation and load local configuration
            checkNodeModules(path);
            config.init(path, version);
            logger.info(`Teq-application is started in '${path}' (ver. ${version}).`);
            // scan node modules for teq-plugins
            pluginsRegistry = await pluginScan.exec(path);
            // init container (autoload & replacements) before do something else
            initDiContainer(container, pluginsRegistry);
            // ... then do something else
            try {
                await initPlugins(pluginsRegistry);
                await initCommander(pluginsRegistry);
            } catch (e) {
                console.error(e);
                this.stop().then();
            }
        };

        this.run = async function () {
            // VARS
            const me = this;

            // FUNCS
            /**
             * Event handler to run application finalization on stop events.
             * @return {Promise<void>}
             */
            async function onStop() {
                await me.stop();
                process.exit();
            }

            // MAIN
            process.on('SIGINT', onStop);
            process.on('SIGTERM', onStop);
            process.on('SIGQUIT', onStop);

            // run commander
            program.parse(process.argv);
            // print out help and stop by default
            if (!process.argv.slice(2).length) {
                program.outputHelp();
                await this.stop();
            }
        };

        this.stop = async function () {
            // FUNCS
            /**
             * Go through plugins hierarchy (down to top) and run finalization functions.
             * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
             * @return {Promise<void>}
             */
            async function stopPlugins(registry) {
                // MAIN
                logger.info('Stop plugins.');
                const plugins = registry.getItemsByLevels();
                for (const item of plugins) {
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc.Dto} */
                    const desc = item.teqfw[DEF.SHARED.NAME];
                    if (desc?.plugin?.onStop) {
                        /** @type {Function} */
                        let fn;
                        try {
                            fn = await container.get(`${desc.plugin.onStop}$$`); // as new instance
                        } catch (e) {
                            logger.error(`Cannot create plugin init function using '${desc.plugin.onStop}' factory. `
                                + `Error: ${e.message}`);
                        }
                        if (typeof fn === 'function') {
                            try {
                                await fn();
                            } catch (e) {
                                logger.error(`Cannot run plugin init function'${fn?.namespace}'. `
                                    + `Error: ${e.message}`);
                                throw e;
                            }
                        }
                    }
                }
            }

            // MAIN
            logger.info('Stop the platform app.');
            await stopPlugins(pluginsRegistry);
            logger.info('The platform app is stopped.');
        };
    }
}
