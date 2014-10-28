
// @private
// Like onDefined, but calls the callback just once.
var onceDefined = function(object, property, callback) {
    if (object[property] !== undefined) callback(object[property]);
    watch(object, property, function handler(prop, action, newValue, oldValue) {
        if (newValue !== undefined) {
            unwatch(object, property, handler);

            callback(newValue);
        }
    });
};
