;(function (agent) {

agent.serializeEvent = function (eventName, event) {
  return {
    eventName: eventName,
    callback: agent.inspectValue(event.callback),
    context: agent.inspectValue(event.context || event.ctx)
  };
};

agent.serializeEvents = function (events, eventName) {
  return _.map(events, _.partial(agent.serializeEvent, eventName));
};

})(this);
