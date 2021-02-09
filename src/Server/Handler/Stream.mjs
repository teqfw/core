import {constants as H2} from 'http2';

/**
 * Factory to create handler for server's streams.
 */
export default class TeqFw_Core_App_Server_Handler_Stream {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Logger} */
        const logger = spec['TeqFw_Core_App_Logger$'];  // instance singleton
        /** @type {typeof TeqFw_Core_App_Server_Http2_Context} */
        const HttpContext = spec['TeqFw_Core_App_Server_Http2_Context#'];   // class constructor
        /** @type {typeof TeqFw_Core_App_Server_Http2_Context_Shared} */
        const SharedContext = spec['TeqFw_Core_App_Server_Http2_Context_Shared#'];   // class constructor
        /** @type {TeqFw_Core_App_Server_Handler_Api} */
        const factHndlApi = spec['TeqFw_Core_App_Server_Handler_Api$']; // instance singleton
        /** @type {TeqFw_Core_App_Server_Handler_Static} */
        const factHndlStatic = spec['TeqFw_Core_App_Server_Handler_Static$'];  // instance singleton
        /** @type {Fl32_Teq_User_App_Server_Handler_Session} */
        const factHndlUserSession = spec['Fl32_Teq_User_App_Server_Handler_Session$'];  // instance singleton


        // PARSE INPUT & DEFINE WORKING VARS
        /** @type {Array.<TeqFw_Core_App_Server_Handler_Factory.handler>} */
        const handlers = [];  // ordered array with handlers

        // DEFINE INNER FUNCTIONS

        /**
         * Close stream on any error.
         *
         * @param err
         * @param {ServerHttp2Stream} stream
         */
        function respondError(err, stream) {
            const stack = (err.stack) ?? '';
            const message = err.message ?? 'Unknown error';
            const error = {message, stack};
            const str = JSON.stringify({error});
            console.error(str);
            // debugger;
            if (stream.writable) {
                stream.respond({
                    [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_INTERNAL_SERVER_ERROR,
                    [H2.HTTP2_HEADER_CONTENT_TYPE]: 'application/json'
                });
                stream.end(str);
            }
        }

        /**
         * Process HTTP request after body has been read.
         *
         * @param {ServerHttp2Stream} stream
         * @param {Object<String, String>} headers
         * @param {Number} flags
         * @param {String} body
         * @returns {Promise<void>}
         */
        async function processRequest(stream, headers, flags, body) {

            // DEFINE INNER FUNCTIONS

            /**
             * Validate HTTP request method.
             *
             * @param {Object<String, String>} headers
             * @returns {boolean}
             */
            function hasValidMethod(headers) {
                const method = headers[H2.HTTP2_HEADER_METHOD];
                return (method === H2.HTTP2_METHOD_GET) || (method === H2.HTTP2_METHOD_POST);
            }

            /**
             * Log request data.
             *
             * @param {Object<String, String>} headers
             */
            function logRequest(headers) {
                const method = headers[H2.HTTP2_HEADER_METHOD];
                const path = headers[H2.HTTP2_HEADER_PATH];
                logger.debug(`${method} ${path}`);
            }

            // MAIN FUNCTIONALITY
            // Preprocess incoming data (logging, ACL, etc.)
            logRequest(headers);

            // Analyze input and define type of the request (api or static)
            if (hasValidMethod(headers)) {
                // init request context (contains all data required for current request processing)
                const httpCtx = Object.assign(new HttpContext(), {stream, headers, flags, body});
                httpCtx.shared = new SharedContext();

                // TODO: insert middleware here...

                let isHandled = false;
                for (const handler of handlers) {
                    isHandled = await handler(httpCtx);
                    if (isHandled) break;
                }
                // respond with error if request is not handled yet
                if (!isHandled) {
                    // (4.b) handler is not found (404)
                    stream.respond({
                        [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_NOT_FOUND,
                        [H2.HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8'
                    });
                    const content = 'Appropriate handler is not found for this request.';
                    stream.end(content);
                }
            } else {
                // Request method is not allowed.
                stream.respond({
                    [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_METHOD_NOT_ALLOWED,
                    [H2.HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8'
                });
                stream.end('Only GET and POST methods are allowed.');
            }
        }

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Factory function to create handler for 'Http2Server.stream' events.
         * @returns {Promise<TeqFw_Core_App_Server_Handler_Stream.handler>}
         */
        this.createHandler = async function () {
            // PARSE INPUT & DEFINE WORKING VARS
            /** @type {TeqFw_Core_App_Server_Handler_Factory.handler} */
            const hndlApi = await factHndlApi.createHandler();
            /** @type {TeqFw_Core_App_Server_Handler_Factory.handler} */
            const hndlStatic = await factHndlStatic.createHandler();
            /** @type {TeqFw_Core_App_Server_Handler_Factory.handler} */
            const hndlUser = await factHndlUserSession.createHandler();

            // push handlers to registry with orders
            handlers.push(hndlUser);
            handlers.push(hndlApi);
            handlers.push(hndlStatic);

            // DEFINE INNER FUNCTIONS
            /**
             * Handler to process 'stream' events.
             *
             * @param {ServerHttp2Stream} stream
             * @param {Object<String, String>} headers
             * @param {Number} flags
             * @name TeqFw_Core_App_Server_Handler_Stream.handler
             */
            async function handler(stream, headers, flags) {
                try {
                    // vars to collect input data for POSTs
                    const chunks = [];
                    /* Available events for 'Http2Stream':
                    *   - aborted
                    *   - close
                    *   - error
                    *   - frameError
                    *   - ready
                    *   - timeout
                    *   - trailers
                    *   - wantTrailers
                    * events from 'stream.Readable':
                    *   - close
                    *   - data
                    *   - end
                    *   - error
                    *   - pause
                    *   - readable
                    *   - resume
                    * events from 'stream.Writable':
                    *   - close
                    *   - drain
                    *   - error
                    *   - finish
                    *   - pipe
                    *   - unpipe
                    */
                    // collect input data into array of chunks (if exists)
                    stream.on('data', (chunk) => chunks.push(chunk));
                    // continue process after input has been read
                    stream.on('end', () => processRequest(stream, headers, flags, Buffer.concat(chunks).toString()));
                    stream.on('error', (err) => respondError(err, stream));
                } catch (err) {
                    respondError(err, stream);
                }
            }

            // COMPOSE RESULT
            Object.defineProperty(handler, 'name', {
                value: this.constructor.name + '.' + handler.name,
            });
            return handler;
        };
    }

}
