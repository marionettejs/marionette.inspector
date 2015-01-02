;(function(Agent) {

  Agent.setProperty = function(object, property, options) {
    var opts = {
      configurable: true,
      enumerable: true
    };

    return Object.defineProperty(object, property, _.extend(opts, options));
  };

}(this));