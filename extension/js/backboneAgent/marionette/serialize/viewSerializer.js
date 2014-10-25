var viewSerializer = function(view) {
  var data = {};

  if (!_.isObject(view)) {
    return {};
  }

  data.cid = view.cid;

  data.options = _.map(view.options || {}, function(optValue, optName) {

    var optType;
    if (_.isString(optValue)) {
      optType = "string";
    } else if (_.isNumber(optValue)) {
      optType = "number";
    } else if (_.isFunction(optValue)) {
       optType = "function"
    } else if (_.isObject(optValue)) {
      optType = "object";
    } else if (_.isUndefined(optValue)) {
      optType = "undefined";
    }

    var val = "";
    if (optValue == "string" || optValue == "number") {
      val = optValue;
    }

    return {
      option: optName,
      optType: optType,
      optValue: val
    }

  }, this);

  data.element = serializeElement(view.el, true);

  data.model = {
    attributes: JSON.stringify({})
  };

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

  // console.log('serialize', data);
  return data;
}
