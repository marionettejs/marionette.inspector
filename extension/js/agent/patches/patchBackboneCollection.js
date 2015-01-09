;(function(Agent){

  // @private
  Agent.patchBackboneCollection = function(BackboneCollection) {
    debug.log('Backbone.Collection detected');

    Agent.patchBackboneComponent(BackboneCollection, function(collection) { // on new instance
      Agent.addCidToComponent(collection);

      // registra il nuovo componente dell'app
      var data = Agent.serializeCollection(collection);
      var collectionIndex = Agent.registerAppComponent('Collection', collection, data);

      debug.log('found new collection', collection, data);

      // Patcha i metodi del componente dell'app
      Agent.patchAppComponentTrigger(collection);
    });
  };

}(this));

