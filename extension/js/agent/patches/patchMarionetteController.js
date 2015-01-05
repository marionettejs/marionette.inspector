// @private
this.patchMarionetteController = function(MarionetteController) {
    debug.log("Marionette.controller detected");

    // add initialize if it's not already there (pre 2.x)
    if (!MarionetteController.prototype.initialize) {
      MarionetteController.prototype.initialize = function(){};
    }

    patchBackboneComponent(MarionetteController, _.bind(function(controller) { // on new instance
        this.addCidToComponent(controller);
        var data = {};
        var controllerIndex = this.registerAppComponent("Controller", controller, data);
    }, this));
}
