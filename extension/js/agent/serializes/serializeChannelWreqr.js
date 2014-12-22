this.serializeWreqrChannel = function(channel) {
  var data = {};

  if (!(channel instanceof this.patchedBackboneWreqr.Channel)) {
    return {};
  }

  data.commands = {};
  data.events = {};
  data.requests = {};
  data.channelName = channel.channelName;

  _.each(getWreqrCommands(channel), function(command, commandName) {
    data.commands[commandName] = {
      name: commandName,
      context: this.inspectValue(command.context),
      callback: this.inspectValue(command.callback, command.context)
    }
  }, this, data);

  _.each(getWreqrRequests(channel), function(request, requestName) {
    data.requests[requestName] = {
      name: requestName,
      context: this.inspectValue(request.context),
      callback: this.inspectValue(request.callback, request.context)
    }
  }, this, data);

  _.each(getWreqrEvents(channel), function(eventHandlers, eventName) {
   var eventHandlerList = data.events[eventName] = [];

   _.each(eventHandlers, function(eventHandler) {
    eventHandlerList.push({
      name: eventName,
      context: this.inspectValue(eventHandler.context),
      callback: this.inspectValue(eventHandler.callback, eventHandler.context)
    });
   }, this, eventName, eventHandlerList)
 }, this, data);

  return data;
}

var getWreqrRequests = function(channel) {
  return channel.reqres._wreqrHandlers;
};

var getWreqrCommands = function(channel) {
  return channel.commands._wreqrHandlers;
};

var getWreqrEvents = function(channel) {
  return channel.vent._events
};
