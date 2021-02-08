/**
 * This is marker for 'HTTP2 request context' objects. This is simple object to store data related to one HTTP2 request.
 * See 'HTTP_REQ_CTX_...' keys in plugins Default-objects.
 *
 * It is not a good solution but it is flexible solution. I need the flexibility for the time.
 *
 * @interface
 */
export default class TeqFw_Core_App_Server_Http2_Context {
    /** @type {String} */
    body;
    /** @type {Number} */
    flags;
    /** @type {Object.<String, String>} */
    headers;
    /** @type {TeqFw_Core_App_Server_Http2_Context_Shared} */
    shared;
    /** @type {ServerHttp2Stream} */
    stream;
}
