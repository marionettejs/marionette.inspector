
// @private
this.patchMarionetteObject = function(MarionetteObject) {
    debug.log("MarionetteObject detected");

    patchBackboneComponent(MarionetteObject, bind(function(object) { // on new instance

        // object dont have cids
        Object.defineProperty(object, '__marionette_inspector__cid', {
          enumerable: false,
          writable: false,
          value: _.uniqueId('c')
        });

        var data = {};
        var objectIndex = registerAppComponent("Object", object, data);
    }, this));
}
