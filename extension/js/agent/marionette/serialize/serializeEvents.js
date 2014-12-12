;(function (agent) {

  var serializeEvent = function (eventName, event, eventIndex) {
    var context = event.context || event.ctx;
    return {
      eventName: eventName,
      callback: agent.inspectValue(event.callback, context),
      context: agent.inspectValue(context),
      eventIndex: eventIndex
    };
  };

  agent.serializeEvents = function (events) {
    return _.chain(events).map(function(eventData, eventName) {
      return _.map(eventData, function(event, eventIndex) {
        return serializeEvent(eventName, event, eventIndex);
      })
    }).flatten().value();
  };

})(this);
