this.serializeView = function(view) {
  var data = {};
  // debug.log('serializeView', view)

  if (!_.isObject(view)) {
    return {};
  }

  data.cid = view.cid;

  data.options = this.serializeObject(view.options);
  data.ui = serializeUI(view.ui);
  data.element = serializeElement(view.el, true);
  data.model = this.serializeModel(view.model);
  data.events = serializeEventsHash(view.events);
  data.modelEvents = serializeEventsHash(view.modelEvents);
  data.collectionEvents = serializeEventsHash(view.collectionEvents);
  data.properties = this.serializeObjectProperties(view);

  return data;
}

var serializeUI = function(ui) {
  return _.map(ui, function(element, uiName) {
    return {
      ui: uiName,
      element: serializeElement(element)
    }
  });
}

this.serializeUI = serializeUI;
