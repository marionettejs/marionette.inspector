// @private
this.patchMarionetteApplication = function(MarionetteApplication) {
  debug.log("Marionette.Application detected");

  patchBackboneComponent(MarionetteApplication, function(app) {
    registerAppComponent("Application", app);
    patchAppComponentTrigger(app, 'application');
    patchAppComponentEvents(app);
  }, this);
};
