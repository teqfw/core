/**
 * This is marker for 'shared context' objects. This is simple object to store shared data related to one
 * HTTP2 request. This context is shared between handlers (ACL and API services, for example).
 *
 * See 'HTTP_SHARE_CTX_...' keys in plugins Default-objects.
 *
 * It is not a good solution but it is flexible solution. I need the flexibility for the time.
 *
 * @interface
 */
export default class TeqFw_Core_App_Server_Http2_Context_Shared {
}
