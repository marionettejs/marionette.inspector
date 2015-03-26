;(function(Agent) {

  Agent.serializeWreqrChannel = function(channel) {
    var data = {};

    if (!(channel instanceof Agent.patchedBackboneWreqr.Channel)) {
      return {};
    }

    data.commands = {};
    data.events = {};
    data.requests = {};
    data.channelName = channel.channelName;

    _.each(Agent.getWreqrCommands(channel), function(command, commandName) {
      data.commands[commandName] = {
        name: commandName,
        context: Agent.inspectValue(command.context),
        callback: Agent.inspectValue(command.callback, command.context)
      };
    });

    _.each(Agent.getWreqrRequests(channel), function(request, requestName) {
      data.requests[requestName] = {
        name: requestName,
        context: Agent.inspectValue(request.context),
        callback: Agent.inspectValue(request.callback, request.context)
      };
    });

    _.each(Agent.getWreqrEvents(channel), function(eventHandlers, eventName) {
      var eventHandlerList = data.events[eventName] = [];

      _.each(eventHandlers, function(eventHandler) {
        eventHandlerList.push({
          name: eventName,
          context: Agent.inspectValue(eventHandler.context),
          callback: Agent.inspectValue(eventHandler.callback, eventHandler.context)
        });
      });
    });

    return data;
  }

  Agent.getWreqrRequests = function(channel) {
    return channel.reqres._wreqrHandlers;
  };

  Agent.getWreqrCommands = function(channel) {
    return channel.commands._wreqrHandlers;
  };

  Agent.getWreqrEvents = function(channel) {
    return channel.vent._events
  };

})(Agent);
