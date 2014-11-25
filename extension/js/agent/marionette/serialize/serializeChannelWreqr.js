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
      context: this.contextData(command.context),
      callback: this.inspectValue(command.callback, command.context)
    }
  }, this, data);

  _.each(getWreqrRequests(channel), function(request, requestName) {
    data.requests[requestName] = {
      name: requestName,
      context: this.contextData(request.context),
      callback: this.inspectValue(request.callback, request.context)
    }
  }, this, data);

  _.each(getWreqrEvents(channel), function(eventHandlers, eventName) {
   var eventHandlerList = data.events[eventName] = [];

   _.each(eventHandlers, function(eventHandler) {
    eventHandlerList.push({
      name: eventName,
      context: this.contextData(eventHandler.context),
      callback: this.inspectValue(eventHandler.callback, eventHandler.context)
    });
   }, this, eventName, eventHandlerList)
 }, this, data);

  return data;
}

this.contextData = function(context) {
  if (_.isUndefined(context)) {
    return {inspect: '', cid: null};
  }

  var inspect = this.isKnownType(context) ? this.knownType(context).str : '';

  return {
    inspect: inspect,
    cid: context.cid
  };
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
