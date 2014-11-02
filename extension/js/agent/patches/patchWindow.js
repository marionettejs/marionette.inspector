waitForMarionetteLoad = function(object, callback) {
  onObjectAndPropertiesSetted(
    object,
    'Marionette', ['Application'],
    callback
  );
}

var waitForBackboneLoad = function(callback) {
  onObjectAndPropertiesSetted(
    window,
    'Backbone', ['View', 'Model', 'Router', 'Collection', '$'],
    callback
  );
}


var patchWindow = function(patchBackbone, patchMarionette) {

  var loadedBackbone;

  var onBackboneLoaded = function() {
    debug.log('backbone loaded');

    loadedBackbone = window.Backbone;
    patchBackbone(loadedBackbone);
    waitForMarionetteLoad(loadedBackbone, onMarionetteLoaded);
  }

  var onMarionetteLoaded = function() {
    debug.log('marionette loaded');

    var Marionette = window.Marionette || loadedBackbone.Marionette;
    patchMarionette(loadedBackbone, Marionette);
  }

  waitForBackboneLoad(onBackboneLoaded);
  waitForMarionetteLoad(window, onMarionetteLoaded);
};

