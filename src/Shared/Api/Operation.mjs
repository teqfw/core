/**
 * A low-level atomic operation that performs a minimal, independent task.
 * Operations are used as building blocks for actions and services.
 *
 * The class constructor sets up dependencies for the operation (deps), and the `exec` method
 * executes the operation itself.
 *
 * @interface
 * This code is for documentation purposes only (not executable).
 */
class TeqFw_Core_Shared_Api_Operation {
    /**
     * Executes the operation logic.
     * @param {Object} [params]
     * @returns {Promise<Object>}
     */
    async exec(params) {}
}