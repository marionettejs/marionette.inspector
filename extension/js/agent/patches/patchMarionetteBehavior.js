
// @private
this.patchMarionetteBehavior = function(MarionetteBehavior) {
    debug.log("Backbone.View detected");

    patchBackboneComponent(MarionetteBehavior, bind(function(behavior) { // on new instance

        // collections dont have cids
        Object.defineProperty(behavior, '__marionette_inspector__cid', {
          enumerable: false,
          writable: false,
          value: _.uniqueId('c')
        });

        var data = {};
        var behaviorIndex = registerAppComponent("Behavior", behavior, data);
    }, this));
}
