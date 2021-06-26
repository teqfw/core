/**
 * Plugin level constants (hardcoded configuration).
 */
export default class TeqFw_Core_Defaults {

    BACK_REALM = 'core';  // realm for API services ('/api/core/...') and CLI commands ('core-...')

    I18N_BACK = 'back'; // i18n realm for backend resources in plugin initializer
    I18N_FRONT = 'front'; // i18n realm for frontend resources in plugin initializer
    I18N_SHARED = 'shared'; // i18n realm for shared resources in plugin initializer
}
