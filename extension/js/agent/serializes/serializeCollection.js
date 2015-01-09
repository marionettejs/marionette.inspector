;(function(Agent) {

  Agent.serializeCollection = function(collection) {
    var data = {};

    if (!(collection instanceof Agent.patchedBackbone.Collection)) {
      return {};
    }

    data.properties = Agent.serializeObjectProperties(collection);
    data.cid = collection.__marionette_inspector__cid;

    return data;
  };

})(this);