// @private
this.patchMarionetteApplication = function(MarionetteApplication) {

  patchBackboneComponent(MarionetteApplication, _.bind(function(app) {
    debug.log("Marionette.Application detected");
    this.addCidToComponent(app);

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
