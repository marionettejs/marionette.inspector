
// @private
// Come patchFunction, ma aspetta che il metodo sia definito se questo è undefined al momento
// della chiamata.
var patchFunctionLater = function(object, functionName, patcher) {
    if (object[functionName] === undefined) {
        onceDefined(object, functionName, function() {
            patchFunction(object, functionName, patcher);
        });
    } else {
        patchFunction(object, functionName, patcher);
    }
};
