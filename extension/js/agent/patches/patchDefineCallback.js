;(function(Agent){

  // A globally-accessible object for holding callbacks for patched function access
  Agent.defineCallbacks = {};

  // RequireJS uses the function's arity to determine how to handle dependencies
  // We need to make sure that the function we return maintains the arity of the original function
  // Even though we don't use these arguments, we need to capture them to maintain arity
  Agent.patchDefineCallback = function (originalCallback, newCallback) {
    var callId = _.uniqueId('defineCall');
    Agent.defineCallbacks[callId] = {
      newCallback: newCallback
    };

    var params = _.times(originalCallback.length, function(i) { return 'a' + i; });
    return Function.apply({}, params.concat('' +
      'var newCallback = window.__agent.defineCallbacks.' + callId + '.newCallback;' +
      'delete window.__agent.defineCallbacks.' + callId + ';' +
      'return newCallback.call(this, Array.prototype.slice.call(arguments));'
    ));
  };

}(Agent));