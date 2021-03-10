/**
 * Data structure to add command to commander (@see TeqFw_Core_App_Launcher.init.initCommander.addCommand).
 */
class TeqFw_Core_App_Cli_Command_Data {
    /**
     * Commander action (@see https://www.npmjs.com/package/commander#commands).
     *
     *  @type {Function}
     */
    action;
    desc;
    name;
    ns;
}

/**
 * Interface sample to create commands factories.
 * @deprecated use Factory function instead of class
 */
class TeqFw_Core_App_Cli_Command {

    async create() {
        // this is sample code:
        const result = new TeqFw_Core_App_Cli_Command_Data();
        result.ns = 'vnd-prj';
        result.name = 'command';
        result.desc = '`vnd-prj-command` will be added to commander.';
        result.action = function () {
            console.log('action for commander');
        };
        return result;
    }
}

export {
    TeqFw_Core_App_Cli_Command as default,
    TeqFw_Core_App_Cli_Command_Data as Data,
};
