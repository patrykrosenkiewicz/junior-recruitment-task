/**
 * Creates a new event class
 * @constructor
 * @param {object} the reference to the model and a view
 */

var Event = function (sender) {
    this._sender = sender;
    this._listeners = [];
};



Event.prototype = {

    /**
     * Sets the listener
     * @param {function} callback function
     */

    attach: function (listener) {
        this._listeners.push(listener);
    },

    /**
     * Calls all the listeners functions and passes the calling class and arguments with which this function was called
     * @param {number|string}
     *
     */
    notify: function (args) {
        for (var i = 0; i < this._listeners.length; i += 1) {
            this._listeners[i](this._sender, args);
        }
    }

};