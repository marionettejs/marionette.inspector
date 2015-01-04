// @private
// Patcha il metodo trigger del componente dell'app.

;(function(Agent){


  _.extend(Agent, {

      depth: 0,
      actionId: 0,
      eventId: 0,

      getActionId: function () {
          Agent._incActionId();
          return 'a' + Agent.actionId;
      },

      getEventId: function () {
          return 'e' + (++Agent.eventId);
      },

      _incActionId: _.debounce(function () {
          Agent.actionId++;
      }, 1000)
  });

  var serializeTrigger = function(
    Agent, args, start, end, depth,
    ctx, eventName) {

    // Convert backbone array of array of backbone listener to a flattened array of
    // inspector listener with event trigger merged in.
    var events = _.pick((ctx._events || {}), 'all', eventName);
    var listeners = Agent.serializeEvents(events);

    // save data only if there is
    var data = {
      eventId: Agent.getEventId(),
      actionId: Agent.getActionId(),
      startTime: start,
      endTime: end,
      eventName: eventName,
      args: _.map(args, Agent.inspectValue, Agent),
      depth: depth,
      context: Agent.inspectValue(ctx),
      listeners: listeners
    };

    var dataKind = (data === undefined) ? undefined : "event arguments";

    Agent.addAppComponentAction(ctx, new Agent.AppComponentAction(
      "trigger", eventName, data, dataKind
    ));
  }

  Agent.patchAppComponentTrigger = _.bind(function(appComponent, eventType) {//

    patchFunctionLater(appComponent, "trigger", function(originalFunction) {
      return function(eventName) {

        Agent.depth++;
        var start = performance.now();
        var result = originalFunction.apply(this, arguments);
        var end = performance.now();

        // function signature: trigger(eventName, arg1, arg2, ...)
        var args  = _.rest(arguments);
        var context = this;

        Agent.lazyWorker.push({
          context: Agent,

          args: [Agent, args, start, end, Agent.depth, this, eventName],
          callback: serializeTrigger
        });

        Agent.depth--;

        return result;
      };
    });
  }, Agent);

}(this));

