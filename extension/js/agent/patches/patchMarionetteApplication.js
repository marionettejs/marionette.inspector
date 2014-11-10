// @private
this.patchMarionetteApplication = function(MarionetteApplication) {

  patchBackboneComponent(MarionetteApplication, _.bind(function(app) {
    debug.log("Marionette.Application detected");

    sendAppComponentReport('app:found');

    var appIndex = registerAppComponent("Application", app);
    if (appIndex === 0) {
      this.patchedApp = app;
      debug.log("Main Marionette application registered");
    }
    patchAppComponentTrigger(app, 'application');
    patchAppComponentEvents(app);
  }, this));
};
