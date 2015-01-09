;(function(Agent) {

  var serializeEvent = function (eventName, event, eventIndex) {
    var context = event.context || event.ctx;
    return {
      eventName: eventName,
      callback: Agent.inspectValue(event.callback, context),
      context: Agent.inspectValue(context),
      eventIndex: eventIndex
    };
  };

  Agent.serializeEvents = function (events) {
    return _.chain(events).map(function(eventData, eventName) {
      return _.map(eventData, function(event, eventIndex) {
        return serializeEvent(eventName, event, eventIndex);
      });
    }).flatten().value();
  };

})(this);
