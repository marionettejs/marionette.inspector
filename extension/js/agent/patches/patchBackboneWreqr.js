this.patchBackboneWreqr = function(Wreqr) {

  var Wreqr = this.patchedBackboneWreqr = Wreqr;
  debug.log("Wreqr detected: ", Wreqr);


  _.each(
    [ Wreqr.Commands.prototype, Wreqr.RequestResponse.prototype ],
    this.patchBackboneTrigger, this
  );

  // listen for new channels
  this.onChange(Wreqr.radio._channels, onWreqrChannelChange);
  _.each(Wreqr.radio._channels, function(channel, channelName) {
    this.onNewWreqrChannel(channel, channelName);
  }, this);
}

var onWreqrChannelChange = function(newValue, prop, action, difference, oldValue) {
  _.each(difference.added, function(channelName) {
      var channel = newValue[channelName];
      this.onNewWreqrChannel(channel, channelName);
  }, this, newValue);
}

this.onNewWreqrChannel = function(channel, channelName) {
  var requests = getWreqrRequests(channel);
  var commands = getWreqrCommands(channel);
  var events = getWreqrEvents(channel);

  this.reportNewWreqrChannel(channel, channelName);

  // listen to newly registered or removed requests
  var handler = _.bind(this.onWreqrRequestChange, this, channel);
  onChange(requests, handler);
  invokeStorageUpdater(requests, handler);

  // listen for newly registered or removed commands
  var handler = _.bind(this.onWreqrCommandChange, this, channel);
  onChange(commands, handler);
  invokeStorageUpdater(commands, handler);

  // listen for newly registered or removed events
  var handler = _.bind(this.onWreqrEventChange, this, channel);
  onChange(events, handler);
  invokeStorageUpdater(events, handler);
}

this.onWreqrRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
  this.lazyWorker.push({
    context: this,
    args: [channel],
    callback: function() {
      this.sendAppComponentReport('Channel:change', {
        channelName: channel.channelName,
        data: this.serializeWreqrChannel(channel)
      });
    }
  });

  debug.log('channel request change', channel.channelName);
};

this.onWreqrCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
  this.lazyWorker.push({
    context: this,
    args: [channel],
    callback: function() {
      this.sendAppComponentReport('Channel:change', {
        channelName: channel.channelName,
        data: this.serializeWreqrChannel(channel)
      });
    }
  });

  debug.log('channel command change', channel.channelName);
};

this.onWreqrEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
  this.lazyWorker.push({
    context: this,
    args: [channel],
    callback: function() {
      this.sendAppComponentReport('Channel:change', {
        channelName: channel.channelName,
        data: this.serializeWreqrChannel(channel)
      });
    }
  });

  debug.log('channel event change', channel.channelName);
};

this.reportNewWreqrChannel = function(channel, channelName) {
  this.lazyWorker.push({
    context: this,
    args: [channel],
    callback: function() {
      this.sendAppComponentReport('Channel:new', {
        channelName: channel.channelName,
        data: this.serializeWreqrChannel(channel)
      });
    }
  });
  debug.log('new channel', channel.channelName);
};


var getWreqrRequests = function(channel) {
  return channel.reqres._wreqrHandlers;
};

var getWreqrCommands = function(channel) {
  return channel.commands._wreqrHandlers;
};

var getWreqrEvents = function(channel) {
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
