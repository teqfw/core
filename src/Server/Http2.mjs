import http2 from 'http2';
import $mimeTypes from 'mime-types';
import $path from 'path';

const H2 = http2.constants;

/**
 * HTTP2 server for the application.
 */
export default class TeqFw_Core_App_Server_Http2 {

    constructor(spec) {
        // CONSTRUCTOR INJECTED DEPS
        /** @type {TeqFw_Core_App_Defaults} */
        const DEF = spec['TeqFw_Core_App_Defaults$'];
        /** @type {TeqFw_Core_App_Config} */
        const config = spec['TeqFw_Core_App_Config$'];  // instance singleton
        /** @type {TeqFw_Core_App_Server_Handler_Static} */
        const factHndlStatic = spec['TeqFw_Core_App_Server_Handler_Static$'];   // instance singleton


        // INIT OWN PROPERTIES AND DEFINE WORKING VARS
        /** @type {Http2Server} */
        let server;
        const rootFs = config.get('/path/root');    // path to project root
        const rootWeb = $path.join(rootFs, DEF.FS_WEB);    // default path to app web root

        // DEFINE THIS INSTANCE METHODS


        this.init = async function () {
            // PARSE INPUT & DEFINE WORKING VARS
            const hndlStatic = factHndlStatic.createHandler();

            // DEFINE INNER FUNCTIONS

            /**
             * Close stream on any error.
             *
             * @param err
             * @param {ServerHttp2Stream} stream
             */
            function respondToStreamError(err, stream) {
                console.log(err);
                debugger;
                if (stream.writable) {
                    if (err.code === 'ENOENT') {
                        stream.respond({':status': H2.HTTP_STATUS_NOT_FOUND});
                    } else {
                        stream.respond({':status': H2.HTTP_STATUS_INTERNAL_SERVER_ERROR});
                    }
                    stream.end();
                }
            }

            /**
             * Read regular file (HTML, CSS, JS, imgase, ...) and write it to the response stream.
             *
             * @param {ServerHttp2Stream} stream
             * @param {String} filepath
             * @return {Promise<boolean>}
             */
            async function processRegular(stream, filepath) {
                let result = false;
                const mimeType = $mimeTypes.lookup(filepath);
                if (mimeType) {
                    stream.respondWithFile(filepath, {
                        [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_OK,
                        [H2.HTTP2_HEADER_CONTENT_TYPE]: mimeType
                    });
                    result = true;
                }
                return result;
            }

            // MAIN FUNCTIONALITY

            server = http2.createServer();
            server.on('error', (err) => console.error(err));
            server.on('stream', (stream, headers, flags) => {
                try {
                    // (1) we need to get all info from the stream
                    const method = headers[H2.HTTP2_HEADER_METHOD];
                    const path = headers[H2.HTTP2_HEADER_PATH];
                    const contentType = headers[H2.HTTP2_HEADER_CONTENT_TYPE];

                    // vars to collect input data for POSTs
                    let body;
                    const chunks = [];

                    // collect input data into array of chunks (if exists)
                    stream.on('data', (chunk) => chunks.push(chunk));

                    //
                    stream.on('end', () => {
                        body = Buffer.concat(chunks).toString();
                        // (2) preprocess incoming data (logging, ACL, etc.)
                        // (3) we should analyze input and define type of the request (api or static)
                        if (
                            (method === H2.HTTP2_METHOD_GET) ||
                            (method === H2.HTTP2_METHOD_POST)
                        ) {
                            const filepath = $path.join(rootWeb, path);
                            const isHandled = processRegular(stream, filepath);
                            if (!isHandled) {
                                // (4.a) use appropriate handler to process the request
                                stream.respond({
                                    [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_NOT_FOUND,
                                    [H2.HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8'
                                });
                                const content = (body) ?? '';
                                stream.end(content);
                            }
                        } else {
                            // (4.b) use appropriate handler to process the request
                            stream.respond({
                                [H2.HTTP2_HEADER_STATUS]: H2.HTTP_STATUS_METHOD_NOT_ALLOWED,
                                [H2.HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8'
                            });
                            stream.end('Only GET and POST methods are allowed.');
                        }
                    });

                    stream.on('error', (err) => respondToStreamError(err, stream));

                } catch (err) {
                    const stack = (err.stack) ?? '';
                    const message = err.message ?? 'Unknown error';
                    const error = {message, stack};
                    const str = JSON.stringify({error});
                    console.error(str);
                    stream.respond({
                        [H2.HTTP2_HEADER_STATUS]: 500,
                        [H2.HTTP2_HEADER_CONTENT_TYPE]: 'application/json'
                    });
                    stream.end(str);
                }
            });
        };


        /**
         * Run HTTP2 server.
         *
         * @param {number} port
         */
        this.listen = function (port) {
            server.listen(port);
        };
    }
}
