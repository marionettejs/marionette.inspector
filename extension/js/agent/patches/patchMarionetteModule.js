
// @private
this.patchMarionetteModule = function(MarionetteModule) {
    debug.log("MarionetteModule detected");

    patchBackboneComponent(MarionetteModule, bind(function(module) { // on new instance

        // module dont have cids
        Object.defineProperty(module, '__marionette_inspector__cid', {
          enumerable: false,
          writable: false,
          value: _.uniqueId('c')
        });

        var data = {};
        var moduleIndex = registerAppComponent("Module", module, data);
    }, this));
}
