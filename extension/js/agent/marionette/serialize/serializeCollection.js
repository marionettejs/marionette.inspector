this.serializeCollection = function(collection) {
  var data = {};

  if (!(collection instanceof this.patchedBackbone.Collection)) {
    return {};
  }

  data.properties = this.serializeObjectProperties(collection);
  data.cid = collection.__marionette_inspector__cid;

  return data;
}