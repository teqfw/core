/**
 * Logger to print out basic information about request.
 */
// MODULE'S EXPORT
export default class TeqFw_Core_App_Server_Log {
    /** @type {TeqFw_Core_App_Logger} */
    _logger

    constructor(spec) {
        this._logger = spec.TeqFw_Core_App_Logger$;

        const me = this;

        this.handle = function (req, res, next) {
            me._logger.debug(`${req.method} ${req.url}`);
            next();
        };
    }

}
