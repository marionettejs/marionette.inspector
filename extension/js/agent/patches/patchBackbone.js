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
  var marionetteLoaded = new Promise(function (resolve) {

    var onMarionetteLoaded = function (Marionette) {
      debug.log('marionette loaded');
      resolve(Marionette);
    };

    onceDefined(window, 'Marionette', onMarionetteLoaded);

    backboneLoaded.then(function () {
      debug.log('backbone loaded');
      onceDefined(Backbone, 'Marionette', onMarionetteLoaded);
    });
  });

  Promise.all([backboneLoaded, marionetteLoaded]).then(function (modules) {
    debug.log('modules loaded');
    onModulesLoaded({
      Backbone: modules[0],
      Marionette: modules[1]
    })
  });
};

