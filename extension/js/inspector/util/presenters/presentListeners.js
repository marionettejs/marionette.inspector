define(['util/sortAttributes'], function(sortAttributes) {
  return function(listeners) {

    var data = [];

    _.each(listeners, function(listener) {
      var callback = listener.callback;

      // _events.show.0.callback
      var path = ["_events", listener.eventName, listener.eventIndex, "callback"].join(".");

      data.push({
        context: listener.context,
        name: callback.key || callback.inspect,
        path: path,
        eventName: listener.eventName,
        sortKey: listener.eventName
      });

    });
    var sortedData = sortAttributes(data);
    return sortedData;
  };
});
