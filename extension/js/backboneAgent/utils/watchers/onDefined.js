
// @private
// Like onSetted, but calls the callback every time object[property] is setted to a non
// undefined value and also immediately if it's already non-undefined.
var onDefined = function(object, property, callback) {
    if (object[property] !== undefined) callback(object[property]);
    onSetted(object, property, function(newValue) {
        if (newValue !== undefined) callback(newValue);
    });
};
