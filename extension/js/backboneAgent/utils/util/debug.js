// @private
// backbone agent debugging utils
var debug = {
    active: false, // set to true in logic to activate debugging
    log: function() {
        if (!this.active) return;
        arguments[0] = 'bb: ' + arguments[0];
        console.log.apply(console, arguments);
    }
}
