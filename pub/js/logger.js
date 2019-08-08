define(function () {
    let _module_private = 0;

    function TeqFw_Core_App_Front_Logger() {
        this.debug = function (message) {
            console.log("DEBUG." + (_module_private++) + ": " + message);
        };

        this.info = function (message) {
            console.log("INFO." + (_module_private++) + ": " + message);
        }
    }

    return new TeqFw_Core_App_Front_Logger();
});