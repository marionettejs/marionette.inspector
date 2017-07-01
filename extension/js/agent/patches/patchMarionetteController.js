;(function(Agent){

  // @private
  Agent.patchMarionetteController = function(MarionetteController) {
    debug.log('Marionette.controller detected');

    // add initialize if it's not already there (pre 2.x)
    if (!MarionetteController.prototype.initialize) {
      MarionetteController.prototype.initialize = function(){};
    }

    Agent.patchBackboneComponent(MarionetteController, function(controller) { // on new instance
      Agent.addCidToComponent(controller);
      Agent.registerAppComponent('Controller', controller, {});
    });
  };

}(Agent));