// @private
this.patchMarionetteApplication = function(MarionetteApplication) {
  debug.log("Marionette.Application detected");

  patchBackboneComponent(MarionetteApplication, _.bind(function(app) {
    var appIndex = registerAppComponent("Application", app);
    if (appIndex === 0) {
      this.mainMarionetteApp = app;
      debug.log("Main Marionette application registered");
    }
    patchAppComponentTrigger(app, 'application');
    patchAppComponentEvents(app);
  }, this));
};
