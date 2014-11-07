this.patchBackboneRadio = function(Radio) {

  var Radio = this.patchedBackboneRadio = Radio;
  debug.log("Radio detected: ", Radio);

  // listen for new channels
  this.onChange(Radio._channels, onRadioChannelChange);
  _.each(Radio._channels, function(channel, channelName) {
    this.onNewRadioChannel(channel, channelName);
  }, this);
};

var onRadioChannelChange = function(newValue, prop, action, difference, oldValue) {
  _.each(difference.added, function(channelName) {
      var channel = newValue[channelName];
      this.onNewRadioChannel(channel, channelName);
  }, this, newValue);
};

this.onNewRadioChannel = function(channel, channelName) {
  var requests = getRadioRequests(channel);
  var commands = getRadioCommands(channel);
  var events = getRadioEvents(channel);

  this.reportNewRadioChannel(channel, channelName);

  // listen to newly registered or removed requests
  var handler = _.bind(this.onRadioRequestChange, this, channel);
  onChange(requests, handler);
  invokeStorageUpdater(requests, handler);

  // listen for newly registered or removed commands
  var handler = _.bind(this.onRadioCommandChange, this, channel);
  onChange(commands, handler);
  invokeStorageUpdater(commands, handler);

  // listen for newly registered or removed events
  var handler = _.bind(this.onRadioEventChange, this, channel);
  onChange(events, handler);
  invokeStorageUpdater(events, handler);
};

this.onRadioRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel request change', channel.channelName);
};

this.onRadioCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel command change', channel.channelName);
};

this.onRadioEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
  sendAppComponentReport('Channel:change', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('channel event change', channel.channelName);
};

this.reportNewRadioChannel = function(channel, channelName) {
  sendAppComponentReport('Channel:new', {
    channelName: channel.channelName,
    data: this.serializeChannelRadio(channel)
  });
  debug.log('new channel', channel.channelName);
};


var getRadioRequests = function(channel) {
  return channel._requests;
};

var getRadioCommands = function(channel) {
  return channel._commands;
};

var getRadioEvents = function(channel) {
  return channel._events;
};