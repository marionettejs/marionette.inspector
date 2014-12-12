;(function (agent) {

  var serializeEvent = function (eventName, event) {
    var context = event.context || event.ctx;
    return {
      eventName: eventName,
      callback: agent.inspectValue(event.callback, context),
      context: agent.inspectValue(context)
    };
  };

  agent.serializeEvents = function (events) {
    return _.chain(events).map(function(eventData, eventName) {
      return _.map(eventData, function(event) {
        return serializeEvent(eventName, event);
      })
    }).flatten().value();
  };

})(this);
