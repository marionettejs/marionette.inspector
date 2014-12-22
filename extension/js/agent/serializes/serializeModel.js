this.serializeModel = function(model) {
  var data = {};

  if (!(model instanceof this.patchedBackbone.Model)) {
    return {};
  }

  data.attributes = this.inspectObject(model.attributes);
  data.properties = this.serializeObjectProperties(model);
  data.ancestorInfo = this.ancestorInfo(model);
  data._events = this.serializeEvents(model._events);
  data._previousAttributes = this.inspectObject(model._previousAttributes);
  data.changed = this.inspectObject(model.changed);
  data.cid = model.cid;

  return data;
}

