this.serializeView = function(view) {
  var data = {};
  // debug.log('serializeView', view)

  if (!_.isObject(view)) {
    return {};
  }

  data.cid = view.cid;

  data.options = this.serializeObject(view.options);

  data.element = serializeElement(view.el, true);

  data.model = this.serializeModel(view.model);

  data.events = serializeEventsHash(view.events);
  data.modelEvents = serializeEventsHash(view.modelEvents);
  data.collectionEvents = serializeEventsHash(view.collectionEvents);

  data.ui = _.map(view.ui, function(element, uiName) {
    return {
      ui: uiName,
      element: serializeElement(element)
    }
  });

  if (_.isObject(view.model)) {
      data.model = {
        cid: view.model.cid,
        attributes: JSON.stringify(view.model.attributes),
      }
  }

  return data;
}
