// @private
// Patcha il metodo trigger del componente dell'app.

_.extend(this, {

    depth: 0,
    actionId: 0,
    eventId: 0,

    getActionId: function () {
        this._incActionId();
        return 'a' + this.actionId;
    },

    getEventId: function () {
        return 'e' + (++this.eventId);
    },

    _incActionId: _.debounce(function () {
        this.actionId++;
    }, 1000)
});

var serializeTrigger = function(
  agent, args, start, end, depth,
  ctx, eventName) {

  // Convert backbone array of array of backbone listener to a flattened array of
  // inspector listener with event trigger merged in.
  var events = _.pick((ctx._events || {}), 'all', eventName);
  var listeners = agent.serializeEvents(events);

  // save data only if there is
  var data = {
    eventId: agent.getEventId(),
    actionId: agent.getActionId(),
    startTime: start,
    endTime: end,
    eventName: eventName,
    args: _.map(args, agent.inspectValue, agent),
    depth: depth,
    context: agent.inspectValue(ctx),
    listeners: listeners
  };

  var dataKind = (data === undefined) ? undefined : "event arguments";

  agent.addAppComponentAction(ctx, new agent.AppComponentAction(
    "trigger", eventName, data, dataKind
  ));
}

var patchAppComponentTrigger = _.bind(function(appComponent, eventType) {//

  var agent = this;
  patchFunctionLater(appComponent, "trigger", function(originalFunction) {
    return function(eventName) {

      agent.depth++;
      var start = Date.now();
      var result = originalFunction.apply(this, arguments);
      var end = Date.now();

      // function signature: trigger(eventName, arg1, arg2, ...)
      var args  = _.rest(arguments);
      var context = this;

      agent.lazyWorker.push({
        context: agent,

        args: [agent, args, start, end, agent.depth, this, eventName],
        callback: serializeTrigger
      });

      agent.depth--;

      return result;
    };
  });
}, this);
