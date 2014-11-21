var moduleHasComponents = function (Candidate, components) {
  return isObject(Candidate) &&
    _.all(components, function (component) {
      return _.isFunction(Candidate[component]);
    });
};

var isBackbone = function(Candidate) {
  return moduleHasComponents(Candidate, ['View', 'Model', 'Collection', 'Router']);
};

var isMarionette = function(Candidate) {
  return moduleHasComponents(Candidate, [
    'View', 'ItemView', 'CollectionView',
    'CompositeView', 'Region', 'RegionManager',
    'Application', 'Module'
  ]);
};

// @private
// Calls the callback passing to it the Backbone object every time it's detected.
// The function uses multiple methods of detection.
this.patchDefine = function(patchBackbone, patchMarionette) {
  var agent = this;
  var loadedModules = {};
  debug.log('patch define');

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
            var functionBody = function (bodyArguments) {
              // debug.log('patched argument...');
              var module = originalFunction.apply(this, bodyArguments);

              // check if Backbone has been defined by the factory fuction
              // (some factories set "this" to Backbone)
              var Candidate = module || this;

              if (!loadedModules.Backbone && isBackbone(Candidate)) {
                debug.log('Backbone define detected');
                loadedModules.Backbone = Candidate;
                patchBackbone(Candidate);

                if (isMarionette(Candidate.Marionette)) {
                  debug.log('Marionette define detected');
                  loadedModules.Marionette = Candidate.Marionette;
                  patchMarionette(loadedModules.Backbone, loadedModules.Marionette);
                }
              }

              if (!loadedModules.Marionette && isMarionette(Candidate)) {
                debug.log('Marionette define detected');
                loadedModules.Marionette = Candidate;
                patchMarionette(loadedModules.Backbone, loadedModules.Marionette);
              }

              return module;
            };

            return agent.patchDefineCallback(argumentsArray[i], functionBody);
          });

          break;
        }
      }
      return originalFunction.apply(this, argumentsArray);
    }});
};
