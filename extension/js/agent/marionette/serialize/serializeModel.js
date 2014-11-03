this.serializeModel = function(model) {
  var data = {};

  if (!(model instanceof this.patchedBackbone.Model)) {
    return {};
  }

  data.inspectedAttributes = this.inspectValue(model.attributes);
  data.serializedAttributes = this.serializeObject(model.attributes);
  data.serializedProperties = this.serializeObjectProperties(model);
  data.attributes = toJSON(model.attributes);
  data.cid = model.cid;

  return data;
}