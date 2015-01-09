;(function(Agent){

  // @private
  // Come patchFunction, ma aspetta che il metodo sia definito se questo è undefined al momento
  // della chiamata.
  Agent.patchFunctionLater = function(object, functionName, patcher) {
    if (object[functionName] === undefined) {
      Agent.onceDefined(object, functionName, function() {
        Agent.patchFunction(object, functionName, patcher);
      });
    } else {
      Agent.patchFunction(object, functionName, patcher);
    }
  };

}(this));