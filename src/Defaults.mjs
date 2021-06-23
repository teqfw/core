/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Defaults {
    API_LOAD_CFG = '/load/config';

    BACK_REALM = 'core';  // realm for API services ('/api/core/...') and CLI commands ('core-...')

    DI_BOOTSTRAP = 'bootstrap'; // DI container label for bootstrap configuration.
    DI_I18N = 'coreI18n';
    DI_STORE = 'coreStore'; // TODO: move it to http2/vue plugin (see TeqFw_Http2_Front_Gate_Load_Config.gate).

    I18N_BACK = 'back'; // i18n realm for backend resources in plugin initializer
    I18N_FRONT = 'front'; // i18n realm for frontend resources in plugin initializer
    I18N_SHARED = 'shared'; // i18n realm for shared resources in plugin initializer
}
