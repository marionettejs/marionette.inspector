var patchBackbone = function(onModulesLoaded) {
  var backboneLoaded = new Promise(function (resolve) {
    onObjectAndPropertiesSetted(
      window,
      'Backbone', ['View', 'Model', 'Router', 'Wreqr', 'Collection', '$'],
      resolve
    );
  });

  // Because Marionette is assigned to window only when it's ready,
  // we just need to make sure it's assigned to something
  // instead of also checking for properties, like with Backbone
  var Marionette;
  var marionetteLoaded = new Promise(function (resolve) {

    var onMarionetteLoaded = function (loadedMarionette) {
      debug.log('marionette loaded');
      Marionette = loadedMarionette;
      resolve();
    };

    onceDefined(window, 'Marionette', onMarionetteLoaded);

    backboneLoaded.then(function () {
      debug.log('backbone loaded');
      onceDefined(Backbone, 'Marionette', onMarionetteLoaded);
    });
  });

  Promise.all([backboneLoaded, marionetteLoaded]).then(function () {
    debug.log('modules loaded');
    onModulesLoaded({
      Backbone: window.Backbone,
      Marionette: Marionette
    })
  });
};

