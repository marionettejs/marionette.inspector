define([], function() {
  return function(object) {
    return _.contains([
        "type-backbone-view", "type-marionette-item-view",
        "type-marionette-layout-view", "type-marionette-layout",
        "type-marionette-collection-view","type-marionette-composite-view"
      ], object.type)
  }
});