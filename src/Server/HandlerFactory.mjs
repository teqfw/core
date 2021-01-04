export default class TeqFw_Core_App_Server_HandlerFactory {

    /**
     * @param {TeqFw_Di_SpecProxy} spec
     */
    constructor(spec) {
        /** @type {TeqFw_Di_Container} */
        const container = spec['TeqFw_Di_Container$'];  // singleton instance

        // DEFINE THIS INSTANCE METHODS (NOT IN PROTOTYPE)

        /**
         * Use service parts factory to create request handler and register it to appropriate route.
         * @param {Function} server (expressjs?)
         * @param {String} module empty string for application level services or module name ('user')
         * @param {String} dependencyId 'path' to service parts factory
         * @return {Promise<void>}
         */
        this.registerService = async function (server, module, dependencyId) {
            // DEFINE INNER FUNCTIONS
            function createHandler(parseRequest, processRequest) {

                return async function handler(req, res, next) {
                    try {
                        const dataIn = await parseRequest(req);
                        const dataOut = await processRequest(dataIn, req, res, next);
                        res.setHeader('Content-Type', 'application/json; charset=UTF-8');
                        res.end(JSON.stringify({data: dataOut}));
                    } catch (err) {
                        const stack = (err.stack) ?? '';
                        const message = err.message ?? 'Unknown error';
                        const error = {message, stack};
                        const str = JSON.stringify({error});
                        console.error(str);
                        res.setHeader('Content-Type', 'application/json');
                        res.status(500);
                        res.end(str);
                    }
                };
            }

            // MAIN FUNCTIONALITY
            const service = await container.get(dependencyId);
            const route = service.getRoute();
            const parse = service.createParser();
            const process = service.createProcessor();

            const fullRoute = `/api/${module}${route}`;
            const handler = createHandler(parse, process);
            server.all(fullRoute, handler);
        };
    }
}

