;(function(Agent) {

  // @private
  Agent.watchOnce = function(object, property, callback) {
      watch(object, property, function onceHandler(prop, action, newValue, oldValue) {
          // facendo l'unwatch prima di chiamare la callback (invece di farlo dopo),
          // è possibile in quest'ultima impostare la proprietà property
          // senza incorrere in un loop infinito.
          unwatch(object, property, onceHandler);

          callback(prop, action, newValue, oldValue);
      });
  };

}(Agent));