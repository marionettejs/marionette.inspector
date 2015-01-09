;(function(Agent){

  Agent.patchMarionetteApplication = function(MarionetteApplication) {

    Agent.patchBackboneComponent(MarionetteApplication, function(app) {
      debug.log('Marionette.Application detected');
      Agent.addCidToComponent(app);

      var data = {};
      var appIndex = Agent.registerAppComponent('Application', app, data);

      if (appIndex === 0) {
        Agent.patchedApp = app;
        debug.log('Main Marionette application registered');
      }

      Agent.patchAppComponentTrigger(app, 'application');
    });
  };

}(Agent));

