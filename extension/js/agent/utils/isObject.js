// @private
// Nota: null non è considerato un oggetto.
var isObject = function(target) {
    return typeof target == "object" && target !== null;
};
