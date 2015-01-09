;(function(Agent) {

  // @private
  // watcher is an array [object, property, (internal) handler] as returned by the on setted functions
  Agent.stopOnSetted = function(watcher) {
      unwatchOne.apply(this, watcher);
  };

}(this));