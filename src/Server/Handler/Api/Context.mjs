/**
 * This is marker for 'API request context' objects. This is simple object to store data related to one API request.
 * See 'API_REQ_CTX_...' keys in plugins Default-objects.
 *
 * It is not a good solution but it is flexible solution. I need the flexibility for the time.
 */
export default class TeqFw_Core_App_Server_Handler_Api_Context {
    request; // see TeqFw_Core_App_Defaults.API_REQ_CTX_REQUEST
    /** @type {TeqFw_Core_App_Server_Http2_Context_Shared} */
    sharedContext;
}
