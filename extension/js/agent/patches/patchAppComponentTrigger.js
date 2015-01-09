;(function(Agent){

  // @private
  // Patcha il metodo trigger del componente dell'app.

  var depth = 0;
  var actionId = 0;
  var eventId = 0;

  var getActionId = function () {
    _incActionId();
    return 'a' + actionId;
  };

  var getEventId = function () {
    return ++eventId;
  };

  var _incActionId = _.debounce(function () {
    actionId++;
  }, 1000);

  var serializeTrigger = function(
    Agent, args, start, end, depth,
    ctx, eventName) {

    // Convert backbone array of array of backbone listener to a flattened array of
    // inspector listener with event trigger merged in.
    var events = _.pick((ctx._events || {}), 'all', eventName);
    var listeners = Agent.serializeEvents(events);

    // save data only if there is
    var data = {
      eventId: getEventId(),
      actionId: getActionId(),
      startTime: start,
      endTime: end,
      eventName: eventName,
      args: _.map(args, Agent.inspectValue, Agent),
      depth: depth,
      context: Agent.inspectValue(ctx),
      listeners: listeners
    };

    Agent.sendAppComponentReport('trigger', {
      data: data
    });
  };

  Agent.patchAppComponentTrigger = function() {};


  Agent.patchBackboneTrigger = function(BackboneEvents) {
    Agent.patchFunction(BackboneEvents, 'trigger', function(originalFunction) {
      return function(eventName) {

        // function signature: trigger(eventName, arg1, arg2, ...)
        var args  = _.rest(arguments);
        var context = this;

        depth++;
        var start = performance.now();
        var result = originalFunction.apply(this, arguments);
        var end = performance.now();

        Agent.lazyWorker.push({
          context: Agent,
          args: [Agent, args, start, end, depth, this, eventName],
          callback: serializeTrigger
        });

        depth--;

        return result;
      };
    });
  };

}(this));