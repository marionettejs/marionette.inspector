;(function (agent) {

  var serializeEvent = function (eventName, event) {
    return {
      eventName: eventName,
      callback: agent.inspectValue(event.callback),
      context: agent.inspectValue(event.context || event.ctx)
    };
  };

  agent.serializeEvents = function (events, eventName) {
    return _.map(events, _.partial(serializeEvent, eventName));
  };

})(this);
