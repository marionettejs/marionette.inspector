;(function(Agent) {

  var hiddenPropertyPrefix = '__backboneDebugger__';

  // @private
  Agent.getHiddenProperty = function(object, property) {
      if (!_.isObject(object)) return;
      return object[hiddenPropertyPrefix + property];
  };

  // @private
  Agent.setHiddenProperty = function(object, property, value) {
      if (!_.isObject(object)) return;
      Object.defineProperty(object, hiddenPropertyPrefix + property, {
          configurable: false,
          enumerable: false,
          value: value,
          writable: true
      });
  };

}(this));