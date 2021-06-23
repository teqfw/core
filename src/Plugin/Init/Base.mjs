/**
 * Base class for plugins integration into TeqFW application.
 * @interface
 */
export default class TeqFw_Core_Plugin_Init_Base {

    constructor(spec) {
        /** @type {TeqFw_Core_Defaults} */
        const DEF = spec['TeqFw_Core_Defaults$'];    // singleton

        this.getCommands = function () {
            return [
                'TeqFw_Core_Back_Cli_Version$',
            ];
        };

        this.getFrontendRealms = function () {
            return ['pub', 'sign'];
        };

        this.getHttpStaticMaps = function () {
            return {
                '/web/path/': '/fs/path/',
            };
        };

        this.getI18nResources = function () {
            return {
                [DEF.I18N_BACK]: ['./i18n/back.json'],
                [DEF.I18N_FRONT]: ['./i18n/front.json'],
                [DEF.I18N_SHARED]: ['./i18n/shared.json']
            };
        };

        this.getServicesList = function () {
            return [
                'TeqFw_Http2_Back_Service_Load_Config$',
            ];
        };

        this.getServicesRealm = function () {
            return 'core';
        };
    }

}
