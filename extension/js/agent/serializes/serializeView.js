;(function(Agent) {

  Agent.serializeView = function(view) {
    var data = {};
    // debug.log('serializeView', view)

    if (!_.isObject(view)) {
      return {};
    }


    data.cid = view.cid;
    data.isLoading = false; // set when a view is registered, but not serialized

    data.options = Agent.serializeObject(view.options);
    data.ui = Agent.serializeUI(view.ui);
    data.el = Agent.serializeElement(view.el, 'el', false);
    data.events = Agent.serializeEventsHash(view.events);
    data._events = Agent.serializeEvents(view._events);
    data.modelEvents = Agent.serializeEventsHash(view.modelEvents);
    data.collectionEvents = Agent.serializeEventsHash(view.collectionEvents);
    data.triggers = Agent.serializeEventsHash(view.triggers);
    data.properties = Agent.serializeObjectProperties(view);
    data.ancestorInfo = Agent.ancestorInfo(view);
    data._requirePath = view._requirePath;
    data._className = Agent.serializeClassName(view);
    data.parentClass = Agent.isKnownType(view) ? Agent.knownType(view).name : '';
    data.inspect = Agent.inspectValue(view);
    data.classId = Agent.getHiddenProperty(view, 'classId');

    if (view.model) {
      data.model = {
        cid: view.model.cid
      };
    }

    return data;
  };


  Agent.serializeUI = function(ui) {
    var data = {};
    _.each(ui, function(element, uiName) {
      data[uiName] = Agent.serializeElement(element, uiName, false);
    });

    return data;
  };

}(Agent));