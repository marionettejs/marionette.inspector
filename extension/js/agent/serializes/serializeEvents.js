;(function(Agent) {

  var serializeEvent = function (eventName, event, eventIndex, context) {
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
        return serializeEvent(eventName, event, eventIndex, event.context || event.ctx);
      });
    }).flatten().value();
  };


  Agent.serializeListeningTo = function (view, listeningTo) {
    return _.chain(listeningTo).map(function(otherObj, otherCid) {
      var otherEvents = otherObj._events;
      return _.map(otherEvents, function(eventData, eventName) {
        return _.chain(eventData)
          .filter(function(event, eventIndex) {
            return view.cid == event.ctx.cid
          })
          .map(function(event, eventIndex) {
            var otherEventName = otherCid + ' ' + eventName;
            return serializeEvent(otherEventName, event, eventIndex, view);
          })
          .value();
     })
    }).flatten().value();
  };


})(Agent);
