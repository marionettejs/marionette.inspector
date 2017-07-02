;(function(Agent){

  // @private
  Agent.patchMarionetteObject = function(MarionetteObject) {
      debug.log('MarionetteObject detected');

      Agent.patchBackboneComponent(MarionetteObject, function(object) { // on new instance
          Agent.addCidToComponent(object);
          Agent.registerAppComponent('Object', object, {});
      });
  };

}(Agent));