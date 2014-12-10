// @private
this.patchMarionetteController = function(MarionetteController) {
    debug.log("Marionette.controller detected");

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
