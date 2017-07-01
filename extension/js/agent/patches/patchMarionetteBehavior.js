;(function(Agent){

  // @private
  Agent.patchMarionetteBehavior = function(MarionetteBehavior) {
    debug.log('Backbone.Behavior detected');

    Agent.patchBackboneComponent(MarionetteBehavior, function(behavior) { // on new instance
      Agent.addCidToComponent(behavior);
      Agent.registerAppComponent('Behavior', behavior, {});
    });
  };

}(Agent));