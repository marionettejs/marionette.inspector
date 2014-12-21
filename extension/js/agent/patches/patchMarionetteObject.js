
// @private
this.patchMarionetteObject = function(MarionetteObject) {
    debug.log("MarionetteObject detected");

    patchBackboneComponent(MarionetteObject, _.bind(function(object) { // on new instance
        this.addCidToComponent(object);
        var data = {};
        var objectIndex = registerAppComponent("Object", object, data);
    }, this));
}
