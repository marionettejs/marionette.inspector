this.serializeModel = function(model) {
  var data = {};

  if (!(model instanceof this.patchedBackbone.Model)) {
    return {};
  }

  data.inspectedAttributes = this.inspectValue(model.attributes);
  data.serializedAttributes = this.serializeObject(model.attributes);
  data.serializedProperties = this.serializeObjectProperties(model);
  data.attributes = toJSON(model.attributes);
  data._events = this.serializeModelEvents(model._events);
  data.cid = model.cid;

  return data;
}

this.serializeModelEvents = function(events) {

  if (_.isUndefined(events)) {
    return [];
  }

  var listeners = [];
  _.each(events, function(handlers, eventName) {
     _.each(handlers, function(handler) {
      listeners.push({
        eventName: eventName,
        context: this.inspectValue(handler.context),
        callback: this.inspectValue(handler.callback)
      })
    }, this);
  }, this);

  return listeners;
}
