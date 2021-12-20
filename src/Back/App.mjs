/**
 * Backend application itself.
 * @namespace TeqFw_Core_Back_App
 */
// MODULE'S IMPORT
import process from 'process';
import {Command} from 'commander/esm.mjs';
import {existsSync, statSync} from 'fs';
import {join} from 'path';

/**
 * Main class to launch application: read modules meta data, initialize parts of app, start the app.
 */
export default class TeqFw_Core_Back_App {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Back_Defaults} */
        const DEF = spec['TeqFw_Core_Back_Defaults$'];
        /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc.Factory} */
        const fDesc = spec['TeqFw_Core_Back_Api_Dto_Plugin_Desc#Factory$'];
        /** @type {TeqFw_Di_Shared_Container} */
        const container = spec['TeqFw_Di_Shared_Container$'];
        /** @type {TeqFw_Core_Back_Config} */
        const config = spec['TeqFw_Core_Back_Config$'];
        /** @type {TeqFw_Core_Shared_Logger} */
        const logger = spec['TeqFw_Core_Shared_Logger$'];
        /** @type {TeqFw_Core_Back_Scan_Plugin} */
        const pluginScan = spec['TeqFw_Core_Back_Scan_Plugin$'];

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const program = new Command();
        /** @type {TeqFw_Core_Back_Scan_Plugin_Registry} */
        let pluginsRegistry;

        /**
         * Initialize TeqFW application (DI, config, plugins, etc.).
         *
         * @param {string} path absolute path to the root of the project files (where ./node_modules/ is placed)
         * @param {string} version version for the application ('0.1.0')
         * @returns {Promise<void>}
         */
        this.init = async function ({path, version}) {
            // DEFINE INNER FUNCTIONS

            /**
             * Save bootstrap configuration into configuration container.
             *
             * @param {TeqFw_Core_Back_Config} config
             * @param {string} path
             * @param {string} version
             */
            function initBootConfig(config, path, version) {
                // validate path to './node_modules/'
                const pathNode = join(path, 'node_modules');
                if (!existsSync(pathNode) || !statSync(pathNode).isDirectory())
                    throw new Error(`Cannot find './node_modules/' in '${path}'.`);
                config.setBoot(path, version);
            }

            /**
             * Run 'commander' initialization code for all plugins.
             *
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} registry
             * @returns {Promise<void>}
             * @memberOf TeqFw_Core_Back_App.init
             */
            async function initCommander(registry) {
                // DEFINE INNER FUNCTIONS
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
                        // may be we can stealth errors for dev mode and re-throw its to live mode
                        logger.error(`Cannot create command using '${moduleId}' factory. Error: ${e.message}`);
                        throw  e;
                    }
                }

                // MAIN FUNCTIONALITY
                logger.info('Integrate plugins to the Commander.');
                for (const item of registry.items()) {
                    const desc = fDesc.create(item.teqfw[DEF.SHARED.NAME]);
                    for (const id of desc.commands) await addCommand(id);
                }
            }

            /**
             * Go through all plugins hierarchy (down to top) and register namespaces in DI container.
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} registry
             */
            function initDiContainer(registry) {
                for (const item of registry.items()) {
                    /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                    const desc = item.teqfw[DEF.MOD_DI.NAME];
                    /** @type {TeqFw_Di_Shared_Api_Dto_Plugin_Desc_Autoload} */
                    const auto = desc.autoload;
                    const ns = auto.ns;
                    if (ns) {
                        const path = join(item.path, auto.path);
                        container.addSourceMapping(ns, path, true);
                        logger.info(`'${ns}' namespace is mapped to '${path}'.`);
                    }
                }
                for (const item of registry.getItemsByLevels()) {
                    /** @type {TeqFw_Di_Back_Api_Dto_Plugin_Desc} */
                    const desc = item.teqfw[DEF.MOD_DI.NAME];
                    if (Array.isArray(Object.keys(desc?.replace)))
                        for (const orig of Object.keys(desc.replace)) {
                            const one = desc.replace[orig];
                            if (typeof one === 'string') {
                                container.addModuleReplacement(orig, one);
                            } else if (typeof one === 'object') {
                                if (typeof one[DEF.AREA] === 'string') {
                                    container.addModuleReplacement(orig, one[DEF.AREA]);
                                }
                            }
                        }
                }
            }

            /**
             * Go through plugins hierarchy (down to top) and run init functions.
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} registry
             * @return {Promise<void>}
             */
            async function initPlugins(registry) {
                // MAIN FUNCTIONALITY
                logger.info('Initialize plugins.');
                const plugins = registry.getItemsByLevels();
                for (const item of plugins) {
                    /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc} */
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
                        if (typeof fn === 'function') await fn();
                    }
                }
            }

            // MAIN FUNCTIONALITY
            initBootConfig(config, path, version);
            logger.info(`Teq-application is started in '${path}' (ver. ${version}).`);
            // load local configuration
            config.loadLocal(path);
            // scan node modules for teq-plugins
            pluginsRegistry = await pluginScan.exec(path);
            // init container before do something else
            initDiContainer(pluginsRegistry);
            // ... then do something else
            await initPlugins(pluginsRegistry);
            await initCommander(pluginsRegistry);
        };

        /**
         * Run application (perform requested command).
         *
         * @returns {Promise<void>}
         */
        this.run = async function () {
            // DEFINE WORKING VARS / PROPS
            const me = this;

            // DEFINE INNER FUNCTIONS
            /**
             * Event handler to run application finalization on stop events.
             * @return {Promise<void>}
             */
            async function onStop() {
                await me.stop();
                process.exit();
            }

            // MAIN FUNCTIONALITY
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

        /**
         * Close all connections and stop processes in all plugins.
         * @returns {Promise<void>}
         */
        this.stop = async function () {
            // DEFINE INNER FUNCTIONS
            /**
             * Go through plugins hierarchy (down to top) and run finalization functions.
             * @param {TeqFw_Core_Back_Scan_Plugin_Registry} registry
             * @return {Promise<void>}
             */
            async function stopPlugins(registry) {
                // MAIN FUNCTIONALITY
                logger.info('Stop plugins.');
                const plugins = registry.getItemsByLevels();
                for (const item of plugins) {
                    /** @type {TeqFw_Core_Back_Api_Dto_Plugin_Desc} */
                    const desc = item.teqfw[DEF.SHARED.NAME];
                    if (desc?.plugin?.onStop) {
                        /** @type {Function} */
                        let fn;
                        try {
                            fn = await container.get(`${desc.plugin.onStop}$$`); // as new instance
                        } catch (e) {
                            logger.error(`Cannot create plugin init function using '${desc.plugin.onStop}' factory`
                                + ` or run it. Error: ${e.message}`);
                        }
                        if (typeof fn === 'function') await fn();
                    }
                }
            }

            // MAIN FUNCTIONALITY
            logger.info('Stop the application.');
            await stopPlugins(pluginsRegistry);
            logger.info('The application is stopped.');
        };
    }
}
