this.patchBackboneRadio = function(Radio) {

  var Radio = this.patchedBackboneRadio = Radio;
  debug.log("Radio detected: ", Radio);

  // listen for new channels
  this.onChange(Radio._channels, onChannelChange);
};

var onChannelChange = function(newValue, prop, action, difference, oldValue) {
  _.each(difference.added, function(channelName) {
      var channel = newValue[channelName];
      this.onNewChannel(channel, channelName);
  }, this, newValue);
};

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
};

this.onRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel request change', channel.channelName);
};

this.onCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel command change', channel.channelName);
};

this.onEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel event change', channel.channelName);
};

this.reportNewChannel = function(channel, channelName) {
  sendAppComponentReport('Channel:new', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('new channel', channel.channelName);
};


var getRequests = function(channel) {
  return channel._requests;
};

var getCommands = function(channel) {
  return channel._commands;
};

var getEvents = function(channel) {
  return channel._events;
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
};
