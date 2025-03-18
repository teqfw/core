/**
 * A high-level service that coordinates multiple actions and operations.
 * Services encapsulate complex business logic and ensure process orchestration.
 *
 * The class constructor sets up dependencies (deps), and the `perform` method
 * executes the service logic.
 *
 * @interface
 * This code is for documentation purposes only (not executable).
 */
class TeqFw_Core_Shared_Api_Service {
    /**
     * Performs the service logic, coordinating actions and operations.
     * The returned object **must** always include a `resultCode` field,
     * but may also contain additional properties relevant to the specific service.
     *
     * @param {Object} [params] - Optional parameters for executing the service logic.
     * @returns {Promise<{resultCode: string, [key: string]: any}>} -
     *          A result object where `resultCode` is mandatory and additional properties are optional.
     *
     * @example
     * // Example return value for a service handling email delivery
     * {
     *   resultCode: "SUCCESS",
     *   emailSent: true,
     *   timestamp: "2024-02-04T12:00:00Z"
     * }
     */
    async perform(params) {
        throw new Error('Cannot instantiate an interface');
    }

    /**
     * Returns a list of possible result codes for the service.
     * This method provides a predefined set of possible values that `resultCode` can take.
     *
     * @returns {Object} A frozen object containing possible result codes.
     *
     * @example
     * {
     *   SUCCESS: "SUCCESS",
     *   USER_NOT_FOUND: "USER_NOT_FOUND"
     * }
     */
    getResultCodes() {
        throw new Error('Cannot instantiate an interface');
    }
}
