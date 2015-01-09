;(function(Agent) {

  // @private
  Agent.stopStealthOnSetted = function(watcher) {
      clearInterval(watcher);
  };

}(this));