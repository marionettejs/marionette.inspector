// @private
// Calls the callback passing to it the Backbone object every time it's detected.
// The function uses multiple methods of detection.
var patchDefine = function(callback) {
    var loadedModules = {};

    // AMD
    patchFunctionLater(window, "define", function(originalFunction) {
      return function() {
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
                    var Candidate = module || this;

                    var isBackbone = isObject(Candidate) &&
                      typeof Candidate.View == "function" &&
                      typeof Candidate.Model == "function" &&
                      typeof Candidate.Collection == "function" &&
                      typeof Candidate.Router == "function";

                    if (isBackbone) {
                      loadedModules.Backbone = Candidate;
                    }

                    var marionetteComponents = ['View', 'ItemView', 'CollectionView', 'CompositeView',
                      'Region', 'RegionManager', 'Application', 'Module'];

                    var isMarionette = isObject(Candidate) &&
                      _.all(marionetteComponents, function (component) {
                        return _.isFunction(Candidate[component]);
                      });

                    if (isMarionette)  {
                      loadedModules.Marionette = Candidate;
                    }

                    if (loadedModules.Backbone && loadedModules.Marionette) {
                      callback(loadedModules);
                    }

                    return module;
                }});

                break;
            }
        }
        return originalFunction.apply(this, argumentsArray);
    }});
};
