define([], function() {
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
        eventName: listener.eventName
      });
    });

    return data;
  }
});