this.serializeModel = (function(agent) {

  var serializeEvents = function(events) {

    if (_.isUndefined(events)) {
      return [];
    }

    var listeners = [];
    _.each(events, function(handlers, eventName) {
       _.each(handlers, function(handler) {
        listeners.push({
          eventName: eventName,
          context: agent.inspectValue(handler.context),
          callback: agent.inspectValue(handler.callback)
        })
      });
    });

    return listeners;
  }

  return function(model) {
    var data = {};

    if (!(model instanceof this.patchedBackbone.Model)) {
      return {};
    }

    data.inspectedAttributes = this.inspectValue(model.attributes);
    data.serializedAttributes = this.serializeObject(model.attributes);
    data.serializedProperties = this.serializeObjectProperties(model);
    data.attributes = toJSON(model.attributes);
    data._events = serializeEvents(model._events);
    data.cid = model.cid;

    return data;
  }
}(this));