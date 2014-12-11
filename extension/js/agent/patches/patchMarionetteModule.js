
// @private
this.patchMarionetteModule = function(MarionetteModule) {
    debug.log("MarionetteModule detected");

    patchBackboneComponent(MarionetteModule, bind(function(module) { // on new instance
        this.addCidToComponent(module);
        var data = {};
        var moduleIndex = registerAppComponent("Module", module, data);
    }, this));
}
