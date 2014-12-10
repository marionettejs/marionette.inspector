// @private
this.patchMarionetteApplication = function(MarionetteApplication) {

  patchBackboneComponent(MarionetteApplication, _.bind(function(app) {
    debug.log("Marionette.Application detected");

    Object.defineProperty(app, '__marionette_inspector__cid', {
      enumerable: false,
      writable: false,
      value: _.uniqueId('c')
    });

    var data = {};
    sendAppComponentReport('app:found');
    var appIndex = registerAppComponent("Application", app, data);

    if (appIndex === 0) {
      this.patchedApp = app;
      debug.log("Main Marionette application registered");
    }
    patchAppComponentTrigger(app, 'application');
    patchAppComponentEvents(app);
  }, this));
};
