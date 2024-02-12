/**
 * Create CLI commands that are defined in the teq-plugins.
 *
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Core_Back_App_A_Init_Cmd {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {TeqFw_Core_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            container,
            TeqFw_Core_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Logger$$: logger, // inject the implementation
        }
    ) {
        /**
         * @param {{command:function}} program
         * @param {TeqFw_Core_Back_Api_Plugin_Registry} plugins
         * @return {Promise<void>}
         */
        this.act = async function ({program, plugins}) {
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
                    /** @type {{argument:function, option:function}} */
                    const act = program.command(fullName)
                        .description(cmd.desc)
                        .action(cmd.action);
                    for (const one of cmd.args) act.argument(one.name, one.description, one.fn, one.defaultValue);
                    for (const one of cmd.opts) act.option(one.flags, one.description, one.fn, one.defaultValue);
                    logger.info(`'${fullName}' command is added.`);
                } catch (e) {
                    // maybe we can stealth errors for dev mode and re-throw its to live mode
                    logger.error(`Cannot create command using '${moduleId}' factory. Error: ${e.message}`);
                    throw e;
                }
            }

            // MAIN
            const items = plugins.getItemsByLevels();
            for (const item of items) {
                /** @type {TeqFw_Core_Back_Plugin_Dto_Desc.Dto} */
                const desc = item.teqfw[DEF.SHARED.NAME];
                if (Array.isArray(desc?.commands))
                    for (const moduleId of desc.commands) await addCommand(moduleId);
            }
        };
    }

}