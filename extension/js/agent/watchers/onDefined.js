;(function(Agent) {

  // @private
  // Like onSetted, but calls the callback every time object[property] is setted to a non
  // undefined value and also immediately if it's already non-undefined.
  Agent.onDefined = function(object, property, callback) {
      if (object[property] !== undefined) {
        callback(object[property]);
      }

      Agent.onSetted(object, property, function(newValue) {
          if (newValue !== undefined) callback(newValue);
      });
  };

}(this));