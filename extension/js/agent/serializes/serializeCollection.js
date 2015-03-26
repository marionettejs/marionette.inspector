;(function(Agent) {

  Agent.serializeCollection = function(collection) {
    var data = {};

    if (!(collection instanceof Agent.patchedBackbone.Collection)) {
      return {};
    }

    data.properties = Agent.serializeObjectProperties(collection);
    data.cid =  Agent.getHiddenProperty(collection, 'cid');
    data.classId = Agent.getHiddenProperty(collection, 'classId');
    
    return data;
  };

})(Agent);