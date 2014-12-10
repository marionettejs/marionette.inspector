define([], function() {
  return function(object) {
    var type = object.type || object;

    return _.contains([
        "type-backbone-view", "type-marionette-item-view",
        "type-marionette-layout-view", "type-marionette-layout",
        "type-marionette-collection-view","type-marionette-composite-view"
      ], type)
  }
});