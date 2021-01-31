export default class TeqFw_Core_App_Defaults {
    DI_BOOTSTRAP = 'bootstrap'; // DI container label for bootstrap configuration.
    DI_CONTAINER = 'container'; // DI container label for container itself (see TeqFw_Di_Container.constructor).
    FS_WEB = 'web'; // default folder for plugin's static resources in filesystem
    PID_FILE_NAME = './var/server.pid'; // PID file to stop running server.
    REALM_API = 'api';    // URL prefix for API requests: https://.../api/...
    REALM_STATIC = 'static';    // URL prefix for static files: https://.../static/...
    SERVER_DEFAULT_PORT = 3000; // Default port for listing.
}
