;(function(Agent){

  var waitForMarionetteLoad = function(object, callback) {
    Agent.onObjectAndPropertiesSetted(
      object,
      'Marionette', ['Application'],
      callback
    );
  }

  var waitForBackboneLoad = function(callback) {
    Agent.onObjectAndPropertiesSetted(
      window,
      'Backbone', ['View', 'Model', 'Router', 'Collection', '$'],
      callback
    );
  }

  Agent.patchWindow = function(patchBackbone, patchMarionette) {

    var loadedBackbone;

    var onBackboneLoaded = function() {
      debug.log('Backbone loaded');

      loadedBackbone = window.Backbone;
      Agent.patchBackbone(loadedBackbone);
      waitForMarionetteLoad(loadedBackbone, onMarionetteLoaded);
    };

    var onMarionetteLoaded = function() {
      debug.log('marionette loaded');

      var Marionette = window.Marionette || loadedBackbone.Marionette;
      if (loadedBackbone) {
        Agent.patchMarionette(loadedBackbone, Marionette);
      }
    };

    waitForBackboneLoad(onBackboneLoaded);
    waitForMarionetteLoad(window, onMarionetteLoaded);
  };

}(Agent));