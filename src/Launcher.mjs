/**
 * Application itself.
 */
import $commander from 'commander';
import $path from 'path';

/**
 * Define data structure.
 *
 * @typedef {Object} TeqFw_Core_App_Launcher.Bootstrap
 * @property {string} root absolute path to the root folder of the project
 * @property {string} version current version of the application (`0.1.0`)
 */

/**
 * Main class to launch application: read modules meta data, initialize parts of app, then start the app.
 */
export default class TeqFw_Core_App_Launcher {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Launcher.Bootstrap} */
        const bootCfg = spec[DEF.DI_BOOTSTRAP]; // named singleton
        /** @type {TeqFw_Di_Container} */
        const container = spec[DEF.DI_CONTAINER];   // named singleton
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
        /** @type {TeqFw_Core_App_Logger_Transport_Console} */
        const logToConsole = spec['TeqFw_Core_App_Logger_Transport_Console$'];  // instance singleton
        /** @type {TeqFw_Core_App_Plugin_Scan} */
        const pluginScan = spec['TeqFw_Core_App_Plugin_Scan$']; // instance singleton

        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        const commander = new $commander.Command();

        /**
         * Initialize TeqFW application (load plugins, register services, etc.).
         * @returns {Promise<void>}
         */
        this.init = async function () {
            // DEFINE INNER FUNCTIONS
            const me = this;

            /**
             * Run 'commander' initialization code for all plugins.
             *
             * @param {TeqFw_Core_App_Plugin_Registry} plugins
             * @returns {Promise<void>}
             * @memberOf TeqFw_Core_App_Launcher.init
             */
            async function initCommander(plugins) {
                // DEFINE INNER FUNCTIONS
                /**
                 * Add single command to the app's commander.
                 *
                 * @param {string} className 'Vendor_Module_Fw_Cli_Command_Name'
                 * @returns {Promise<void>}
                 * @memberOf TeqFw_Core_App_Launcher.init.initCommander
                 */
                async function addCommand(className) {
                    /** @type {TeqFw_Core_App_Cli_Command} */
                    const cmd = await container.get(className, me.constructor.name);
                    const {ns, name, desc, action} = await cmd.create();
                    const fullName = (ns) ? `${ns}-${name}` : name;
                    commander.command(fullName)
                        .description(desc)
                        .action(action);
                    logger.info(`'${fullName}' command is added.`);
                }

                // MAIN FUNCTIONALITY
                logger.info('Integrate plugins to the Commander.');
                for (const item of plugins.items()) {
                    if (item.initClass) {
                        /** @type {TeqFw_Core_App_Plugin_Init} */
                        const init = await container.get(item.initClass);
                        if (typeof init.getCommands === 'function') {
                            const commandIds = init.getCommands();
                            logger.info(`Add commands for '${item.name}' plugin.`);
                            for (const id of commandIds) {
                                await addCommand(id);
                            }
                        }
                    }
                }
            }

            /**
             * Run through all plugins and register namespaces in DI container.
             * @param {TeqFw_Core_App_Plugin_Registry} plugins
             */
            function initDiContainer(plugins) {
                for (const item of plugins.items()) {
                    /** @type {TeqFw_Core_App_Plugin_Package_Data_Autoload} */
                    const auto = item.teqfw.autoload;
                    const ns = auto.ns;
                    const path = $path.join(item.path, auto.path);
                    container.addSourceMapping(ns, path, true);
                    logger.info(`'${ns}' namespace is mapped to '${path}'.`);
                }
            }

            // MAIN FUNCTIONALITY
            logger.addTransport(logToConsole);  // setup default logger transport as console
            logger.info(`Teq-application is started in '${bootCfg.root}' (ver. ${bootCfg.version}).`);
            config.load({rootPath: bootCfg.root});  // load local configuration
            const plugins = await pluginScan.exec(bootCfg.root);
            initDiContainer(plugins);
            await initCommander(plugins);
        };

        /**
         * Run application (perform requested command).
         *
         * @returns {Promise<void>}
         */
        this.run = async function () {
            commander.parse(process.argv);
            // print out help and stop by default
            if (!process.argv.slice(2).length) {
                commander.outputHelp();
                await this.stop();
            }
        };

        /**
         * Close all connections and stop processes in all plugins.
         * @returns {Promise<void>}
         */
        this.stop = async function () {
            // close DB connections here
            console.log('stopped');
        };
    }


}
