/**
 * Class to integrate plugin into TeqFW application.
 */
export default class TeqFw_Core_App_Plugin_Init {
    constructor(spec) {
        this.getCommands = function () {
            return [
                'TeqFw_Core_App_Cli_Server_Start$',
                'TeqFw_Core_App_Cli_Server_Stop$',
            ];
        };
    }


}
