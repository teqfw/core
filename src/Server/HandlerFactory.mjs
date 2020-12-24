export default class TeqFw_Core_App_Server_HandlerFactory {

    constructor(spec) {
        /** @type {TeqFw_Di_Container} */
        const container = spec.TeqFw_Di_Container$;

        this.registerHandler = async function (server, module, dependencyId) {
            // DEFINE INNER FUNCTIONS
            function createHandler(parseRequest, processRequest) {

                return async function handler(req, res, next) {
                    try {
                        const dataIn = await parseRequest(req);
                        const dataOut = await processRequest(dataIn);
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
            const parse = service.getParser();
            const process = service.getProcessor();

            const fullRoute = `/api/${module}${route}`;
            const handler = createHandler(parse, process);
            server.all(fullRoute, handler);
        };
    }
}

