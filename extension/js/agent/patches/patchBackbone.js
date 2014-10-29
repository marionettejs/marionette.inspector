var patchBackbone = function(callback) {
  var backboneLoaded = new Promise(function (resolve) {
    onObjectAndPropertiesSetted(
      window,
      'Backbone', ['View', 'Model', 'Router', 'Wreqr', 'Collection'],
      resolve
    );
  });

  // Because Marionette is assigned to window only when it's ready,
  // we just need to make sure it's assigned to something
  // instead of also checking for properties, like with Backbone
  var Marionette;
  var marionetteLoaded = new Promise(function (resolve) {
    var cb = function (loadedMarionette) {
      Marionette = loadedMarionette;
      resolve();
    };

    onceDefined(window, 'Marionette', cb);
    backboneLoaded.then(function () {
      onceDefined(Backbone, 'Marionette', cb);
    });
  });

  Promise.all([backboneLoaded, marionetteLoaded]).then(function () {
    callback({
      Backbone: window.Backbone,
      Marionette: Marionette
    })
  });
};

