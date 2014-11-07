this.serializeWreqrChannel = function(channel) {
  var data = {};

  if (!(channel instanceof this.patchedBackboneWreqr.Channel)) {
    return {};
  }

  data.commands = {};
  data.events = {};
  data.requests = {};
  data.channelName = channel.channelName;

  _.each(getCommands(channel), function(command, commandName) {
    data.commands[commandName] = {
      name: commandName,
      context: this.contextData(command.context),
      callback: this.inspectValue(command.callback)
    }
  }, this, data);

  _.each(getRequests(channel), function(request, requestName) {
    data.requests[requestName] = {
      name: requestName,
      context: this.contextData(request.context),
      callback: this.inspectValue(request.callback)
    }
  }, this, data);

  _.each(getEvents(channel), function(eventHandlers, eventName) {
   var eventHandlerList = data.events[eventName] = [];

   _.each(eventHandlers, function(eventHandler) {
    eventHandlerList.push({
      name: eventName,
      context: this.contextData(eventHandler.context),
      callback: this.inspectValue(eventHandler.callback)
    });
   }, this, eventName, eventHandlerList)
 }, this, data);

  return data;
}

this.contextData = function(context) {
  if (_.isUndefined(context)) {
    return {type: '', cid: null};
  }

  var type = this.isKnownType(context) ? this.knownType(context).toString() : '';

  return {
    type: type,
    cid: context.cid
  };
}

var getRequests = function(channel) {
  return channel.reqres._wreqrHandlers;
};

var getCommands = function(channel) {
  return channel.commands._wreqrHandlers;
};

var getEvents = function(channel) {
  return channel.vent._events
};
