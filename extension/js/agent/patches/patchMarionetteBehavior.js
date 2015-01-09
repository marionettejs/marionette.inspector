;(function(Agent){

  // @private
  Agent.patchMarionetteBehavior = function(MarionetteBehavior) {
    debug.log('Backbone.View detected');

    Agent.patchBackboneComponent(MarionetteBehavior, function(behavior) { // on new instance
      Agent.addCidToComponent(behavior);
      var data = {};
      var behaviorIndex = Agent.registerAppComponent('Behavior', behavior, data);
    });
  };

}(this));