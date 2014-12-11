
// @private
this.patchMarionetteBehavior = function(MarionetteBehavior) {
    debug.log("Backbone.View detected");

    patchBackboneComponent(MarionetteBehavior, bind(function(behavior) { // on new instance
        this.addCidToComponent(behavior);
        var data = {};
        var behaviorIndex = registerAppComponent("Behavior", behavior, data);
    }, this));
}
