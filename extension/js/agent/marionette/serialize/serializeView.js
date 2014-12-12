this.serializeView = function(view) {
  var data = {};
  // debug.log('serializeView', view)

  if (!_.isObject(view)) {
    return {};
  }

  data.cid = view.cid;

  data.options = this.serializeObject(view.options);
  data.ui = this.serializeUI(view.ui);
  data.el = this.serializeElement(view.el, 'el', false);
  data.events = serializeEventsHash(view.events);
  data.modelEvents = serializeEventsHash(view.modelEvents);
  data.collectionEvents = serializeEventsHash(view.collectionEvents);
  data.triggers = serializeEventsHash(view.triggers);
  data.properties = this.serializeObjectProperties(view);
  data.ancestorInfo = this.ancestorInfo(view);
  data._requirePath = view._requirePath;
  data._className = this.serializeClassName(view);
  data.parentClass = this.isKnownType(view) ? this.knownType(view).name : '';

  if (view.model) {
    data.model = {
      cid: view.model.cid
    };
  }

  return data;
}


this.serializeUI = function(ui) {
  var data = {};
  _.each(ui, function(element, uiName) {
    data[uiName] = this.serializeElement(element, uiName, false);
  }, this);

  return data;
}