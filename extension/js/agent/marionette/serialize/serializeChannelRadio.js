this.serializeChannelRadio = function(channel) {
  var data = {};

  if (!(channel instanceof this.patchedBackboneRadio.Channel)) {
    return {};
  }

  data.commands = {};
  data.events = {};
  data.requests = {};
  data.channelName = channel.channelName;

  _.each(getRadioCommands(channel), function(command, commandName) {
    data.commands[commandName] = {
      name: commandName,
      context: this.contextData(command.context),
      callback: this.inspectValue(command.callback, command.context)
    }
  }, this, data);

  _.each(getRadioRequests(channel), function(request, requestName) {
    data.requests[requestName] = {
      name: requestName,
      context: this.contextData(request.context),
      callback: this.inspectValue(request.callback, request.context)
    }
  }, this, data);

  _.each(getRadioEvents(channel), function(eventHandlers, eventName) {
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

var getRadioRequests = function(channel) {
  return channel._requests;
};

var getRadioCommands = function(channel) {
  return channel._commands;
};

var getRadioEvents = function(channel) {
  return channel._events;
};
