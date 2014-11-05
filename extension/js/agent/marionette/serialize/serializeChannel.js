this.serializeChannel = function(channel, requests, commands, events) {
  var data = {};

  if (!(channel instanceof this.patchedBackboneWreqr.Channel)) {
    return {};
  }

  data.commands = {};
  data.events = {};
  data.requests = {};

  _.each(commands, function(command, commandName) {
    data.commands[commandName] = {
      name: commandName,
      context: this.contextData(command.context),
      callback: this.inspectValue(command.callback)
    }
  }, this, data);

  _.each(requests, function(request, requestName) {
    data.requests[requestName] = {
      name: requestName,
      context: this.contextData(request.context),
      callback: this.inspectValue(request.callback)
    }
  }, this, data);

  _.each(events, function(eventHandlers, eventName) {
   var eventHandlerList = data.events[eventName] = [];

   _.each(eventHandlers, function(eventHandler) {
    eventHandlerList.push({
      eventName: eventName,
      context: this.contextData(eventHandler.context),
      callback: this.inspectValue(eventHandler.callback)
    });
   }, this, eventName, eventHandlerList)
 }, this, data);

  debugger;

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