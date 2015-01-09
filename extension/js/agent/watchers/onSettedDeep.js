;(function(Agent) {

  // @private
  // Monitora i set di object[property] e delle sue sottoproprietà, comprese quelle aggiunte successivamente.
  // Rileva inoltre anche le cancellazioni tramite delete delle sottoproprietà.
  // Il livello di profondità del watching è specificato da recursionLevel (come in watch.js):
  // undefined => ricorsione completa, 0 => no ricorsione (solo il livello 0), n>0 => dal livello 0 al livello n)
  Agent.onSettedDeep = function(object, property, onChange, recursionLevel) {
      var handler = function(prop, action, change, oldValue) {
          if (action === 'set' || action === 'differentattr') {
              Agent.onChange();
          }
      };
      watch(object, property, handler, recursionLevel, true);
      return [object, property, handler]; // usable to stop watching via stopOnSetted
  };

}(this));