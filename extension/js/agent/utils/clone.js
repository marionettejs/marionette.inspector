// @private
// Restituisce un clone dell'oggetto passato.
// N.B: le sottoproprietà non saranno clonate (shallow clone).
var clone = function(object) {
    if (!isObject(object)) return object;
    if (isArray(object)) return object.slice();

    var newObject = {};
    for (var prop in object) {
      newObject[prop] = object[prop];
    }
    return newObject;
};
