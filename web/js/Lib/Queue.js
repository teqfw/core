define(function () {

    /**
     * Queue to process objects in FIFO order.
     *
     * https://stackoverflow.com/a/53966257/4073821
     *
     * @class
     */
    class TeqFw_Core_App_Front_Lib_Queue extends Map {

        constructor() {
            super();
            this.insertionIndex = 0;
            this.removalIndex = 0;
        }

        /**
         * Put object into the queue.
         *
         * @param {Object} obj
         */
        queue(obj) {
            this.set(this.insertionIndex, obj);
            this.insertionIndex++;
        }

        /**
         * Get object from queue.
         *
         * @return {Object}
         */
        dequeue() {
            const result = this.get(this.removalIndex);
            if (result !== undefined) {
                this.delete(this.removalIndex);
                this.removalIndex++;
            }
            return result;
        }
    }


    return TeqFw_Core_App_Front_Lib_Queue;
});