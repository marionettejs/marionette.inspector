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
  var requests = getRequests(channel);
  var commands = getCommands(channel);
  var events = getEvents(channel);

  this.reportNewChannel(channel, channelName);

  // listen to newly registered or removed requests
  var handler = _.bind(this.onRequestChange, this, channel);
  onChange(requests, handler);
  invokeStorageUpdater(requests, handler);

  // listen for newly registered or removed commands
  var handler = _.bind(this.onCommandChange, this, channel);
  onChange(commands, handler);
  invokeStorageUpdater(commands, handler);

  // listen for newly registered or removed events
  var handler = _.bind(this.onEventChange, this, channel);
  onChange(events, handler);
  invokeStorageUpdater(events, handler);
}

this.onRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
  var data = {
    channelName: channel.channelName,
    channel: this.serializeChannel(channel)
  };

  sendAppComponentReport('Channel:Change', data);
  debug.log('channel request change', data);
};

this.onCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
  var data = {
    channelName: channel.channelName,
    channel: this.serializeChannel(channel)
  };

  sendAppComponentReport('Channel:Change', data);
  debug.log('channel command change', data);
};

this.onEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
  var data = {
    channelName: channel.channelName,
    channel: this.serializeChannel(channel)
  };

  sendAppComponentReport('Channel:Change', data);
  debug.log('channel event change', data);
};

this.reportNewChannel = function(channel, channelName) {
  var data = {
    channelName: channel.channelName,
    channel: this.serializeChannel(channel)
  };

  sendAppComponentReport('Channel:New', data);
  debug.log('new channel', data);
};


var getRequests = function(channel) {
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
