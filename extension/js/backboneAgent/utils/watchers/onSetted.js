
// @private
// Esegue la callback ogni volta che viene settata la proprietà property sull'oggetto object.
// Nota: alla callback viene passato il valore settato.
var onSetted = function(object, property, callback) {
    var handler = function (prop, action, newValue, oldValue) {
        if (action == "set") { callback(newValue); }
    };
    watch(object, property, handler, 0);
    return [object, property, handler];
};