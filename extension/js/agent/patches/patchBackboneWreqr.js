


this.patchBackboneWreqr = function(Wreqr) {

  var Wreqr = this.patchedBackboneWreqr = Wreqr;
  debug.log("Wreqr detected: ", Wreqr);

  // listen for new channels
  this.onChange(Wreqr.radio._channels, onChannelChange);
}

var onChannelChange = function(newValue, prop, action, difference, oldValue) {
  _.each(difference.added, function(channelName) {
      var channel = newValue[channelName];
      this.onNewChannel(channel, channelName);
  }, this, newValue);
}

this.onNewChannel = function(channel, channelName) {
  debugger;
  var requests = getReqests(channel);
  var commands = getCommands(channel);
  var events = getEvents(channel);

  this.reportNewChannel(channel, channelName);

  // listen to newly registered or removed requests
  onChange(requests, this.onRequestChange);
  invokeStorageUpdater(requests, this.onRequestChange);

  // listen for newly registered or removed commands
  onChange(commands, this.onCommandChange);
  invokeStorageUpdater(commands, this.onCommandChange);

  // listen for newly registered or removed events
  onChange(events, this.onEventChange);
  invokeStorageUpdater(events, this.onEventChange);

}

this.onRequestChange = function(newValue, prop, action, difference, oldvalue) {
  debugger;
};

this.onCommandChange = function(newValue, prop, action, difference, oldvalue) {
  debugger;
};

this.onEventChange = function(newValue, prop, action, difference, oldvalue) {
  debugger;
};


this.reportNewChannel = function(channel, channelName) {
  var requests = getReqests(channel);
  var commands = getCommands(channel);
  var events = getEvents(channel);

  var data = {
    channelName: channelName,
    channel: this.serializeChannel(channel, requests, commands, events)
  };

  sendAppComponentReport('Channel:New', data);
};


var getReqests = function(channel) {
  return channel.reqres._wreqrHandlers;
};

var getCommands = function(channel) {
  return channel.commands._wreqrHandlers;
};

var getEvents = function(channel) {
  return channel.vent._events
};

// we call the storage updater when we discover a new channel because
// often we just created the channel because we're adding a new event, request, or command
// this weird api is designed to match the one we're given be watch.js
var invokeStorageUpdater = function(storage, handler) {
  if (_.isUndefined(storage)) {
    return;
  }

  var difference = {
    added: _.keys(storage),
    removed: []
  };

  if (_.isEmpty(difference.added) && _.isEmpty(difference.removed)) {
    return;
  }

  handler(storage, 'root', 'differentattr', difference, {});
}