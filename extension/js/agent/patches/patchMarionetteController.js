// @private
this.patchMarionetteController = function(MarionetteController) {
    debug.log("Marionette.controller detected");

    // add initialize if it's not already there (pre 2.x)
    if (!MarionetteController.prototype.initialize) {
      MarionetteController.prototype.initialize = function(){};
    }

    patchBackboneComponent(MarionetteController, bind(function(controller) { // on new instance

        // controller dont have cids
        Object.defineProperty(controller, '__marionette_inspector__cid', {
          enumerable: false,
          writable: false,
          value: _.uniqueId('c')
        });

        var data = {};
        var controllerIndex = registerAppComponent("Controller", controller, data);
    }, this));
}
