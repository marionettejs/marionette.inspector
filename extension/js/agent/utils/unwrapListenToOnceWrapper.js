;(function(Agent) {

  Agent.unwrapListenToOnceWrapper = function(func) {
    return func._callback || func;
  }

})(this);