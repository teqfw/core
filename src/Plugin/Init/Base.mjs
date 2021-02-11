/**
 * Base class for plugins integration into TeqFW application.
 * @interface
 */
export default class TeqFw_Core_App_Plugin_Init_Base {

    getCommands() {
        return [
            'TeqFw_Core_App_Cli_Version$',
        ];
    }

    getHttp2BackRealm() {
        return 'core';
    }

    getHttp2Services() {
        return [
            'TeqFw_Core_App_Back_Service_Load_Config$',
        ];
    }

    getHttp2StaticMaps() {
        return {
            '/vue/': '/vue/dist/',
        };
    }
}
