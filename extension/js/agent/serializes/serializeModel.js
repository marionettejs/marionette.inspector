;(function(Agent) {

  Agent.serializeModel = function(model) {
    var data = {};

    if (!(model instanceof Agent.patchedBackbone.Model)) {
      return {};
    }

    data.attributes = Agent.inspectObject(model.attributes);
    data.properties = Agent.serializeObjectProperties(model);
    data.ancestorInfo = Agent.ancestorInfo(model);
    data._events = Agent.serializeEvents(model._events);
    data._previousAttributes = Agent.inspectObject(model._previousAttributes);
    data.changed = Agent.inspectObject(model.changed);
    data.cid = model.cid;
    data.classId = Agent.getHiddenProperty(model, 'classId');
    
    return data;
  };

})(Agent);