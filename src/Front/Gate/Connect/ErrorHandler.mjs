/**
 * Base class to implement indicator for ajax requests (on/off). This is simple implementation of the functionality
 * and should be overridden on application level to interact with UI.
 * @interface
 */
export default class TeqFw_Core_App_Front_Gate_Connect_ErrorHandler {
    business(error) {
        console.log(JSON.stringify(error));
        debugger;
    }

    infrastructure(error) {
        console.log(JSON.stringify(error));
        debugger;
    }
}
