;(function(Agent) {

  Agent.serializeChannelRadio = function(channel) {
    var data = {};

    if (!(channel instanceof Agent.patchedBackboneRadio.Channel)) {
      return {};
    }

    data.commands = {};
    data.events = {};
    data.requests = {};
    data.channelName = channel.channelName;

    _.each(Agent.getRadioCommands(channel), function(command, commandName) {
      data.commands[commandName] = {
        name: commandName,
        context: Agent.inspectValue(command.context),
        callback: Agent.inspectValue(command.callback, command.context)
      };
    });

    _.each(Agent.getRadioRequests(channel), function(request, requestName) {
      data.requests[requestName] = {
        name: requestName,
        context: Agent.inspectValue(request.context),
        callback: Agent.inspectValue(request.callback, request.context)
      };
    });

    _.each(getRadioEvents(channel), function(eventHandlers, eventName) {
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


  Agent.getRadioRequests = function(channel) {
    return channel._requests;
  };

  Agent.getRadioCommands = function(channel) {
    return channel._commands;
  };

  Agent.getRadioEvents = function(channel) {
    return channel._events;
  };

}(this));