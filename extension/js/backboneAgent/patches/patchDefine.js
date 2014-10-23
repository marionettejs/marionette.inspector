// @private
// Calls the callback passing to it the Backbone object every time it's detected.
// The function uses multiple methods of detection.
var patchDefine = function(callback) {

    // AMD
    patchFunctionLater(window, "define", function(originalFunction) { return function() {
        // function arguments: (id? : String, dependencies? : Array, factory : Function)

        // make arguments editable
        var argumentsArray = Array.prototype.slice.call(arguments);
        // find the factory function to patch it
        for (var i=0,l=argumentsArray.length; i<l; i++) {
            if (typeof argumentsArray[i] == "function") {
                // factory function found, patch it.
                // NOTE: in the patcher function, specify the parameters for the
                // default modules, or in case of a module with no dependencies but
                // that uses the default modules internally, the original define would see a 0-arity
                // function and would call it without them (see define() in the AMD API)
                patchFunction(argumentsArray, i, function(originalFunction) {
                  return function(require, exports, modules) {
                    var module = originalFunction.apply(this, arguments);

                    // check if Backbone has been defined by the factory fuction
                    // (some factories set "this" to Backbone)
                    var BackboneCandidate = module || this;//


                    var isBackbone = isObject(BackboneCandidate) &&
                                     typeof BackboneCandidate.View == "function" &&
                                     typeof BackboneCandidate.Model == "function" &&
                                     typeof BackboneCandidate.Collection == "function" &&
                                     typeof BackboneCandidate.Router == "function";
                    if (isBackbone) {
                        callback(BackboneCandidate);
                    }

                    return module;
                }});

                break;
            }
        }
        return originalFunction.apply(this, argumentsArray);
    }});
};
