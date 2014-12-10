this.patchDefine = (function(agent){
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

  // find the factory function to patch it
  var patchFactoryFunction = function(defineArgs) {
    for (var i=0, l=defineArgs.length; i<l; i++) {
      if (typeof defineArgs[i] != "function") {
        continue;
      }

      patchFunction(defineArgs, i, _.partial(_patchFactoryFunc, defineArgs, i));
    }
  }

  /**
    Factory function found, patch it.

    We patch the factory function with the checks to see if the module is
    Backbone or Marionette.

    NOTE: in the patcher function, specify the parameters for the
    default modules, or in case of a module with no dependencies but
    that uses the default modules internally, the original define would see a 0-arity
    function and would call it without them (see define() in the AMD API)

    @param defineArgs - arguments passed to define function
    @param defineIndex - index that the factory function appeared in the list of dependencies
    @param originalFunction - the anonymous function created inside of the define block
  */
  var _patchFactoryFunc = function(defineArgs, defineIndex, originalFunction) {
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
      }

      if (!loadedModules.Marionette && isBackbone(Candidate)) {
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

    // we patch the define call back so that the functionBody is
    // called with the same arity that the original anonymous function was called with.
    return agent.patchDefineCallback(defineArgs[defineIndex], functionBody);
  };


  /**
   loadedModules holds Backbone and Marionette when they are
   detected.

   We do not currently store other modules
  */
  var loadedModules = {};

  // function to call to patch marionette
  var patchMarionette;

  // function to call to patch backbone
  var patchBackbone;

  /**
   We patch define so that we can detect Backbone and Marionette
   being defined and patch them.

   We are able to find Backbone, for example, by listening to all of the `define`
   calls and checking to see if Backbone is defined.

   Going forward, we also want to detect other Backbone classes being
   defined like View and Model and set the `_classPath`, `_className` and `_templatePath`.

   _classPath = the full require path
   _className = the basename (name of the file) in the require path
   _templatePath = the path to the template if it's provided via 'template!path/to/file' definition

   AMD
   function arguments:
   (id? : String, dependencies? : Array, factory : Function)

   @param _patchBackbone - callback called when we detect Backbone being defined
   @param _patchMarionette - callback called when we detect Marionette being defined
  */
  return function(_patchBackbone, _patchMarionette) {
    patchBackbone = _patchBackbone;
    patchMarionette = _patchMarionette;

    debug.log('patch define');
    patchFunctionLater(window, "define", function(defineFunction) {
      return function() {
        var args = _.toArray(arguments);
        patchFactoryFunction(args);
        return defineFunction.apply(this, args);
      }
    });
  };

}(this));
