;(function(Agent){

  Agent.patchBackboneWreqr = function(Wreqr) {

    var Wreqr = Agent.patchedBackboneWreqr = Wreqr;
    debug.log('Wreqr detected: ', Wreqr);

    _.each(
      [ Wreqr.Commands.prototype, Wreqr.RequestResponse.prototype ],
      Agent.patchBackboneTrigger
    );

    // listen for new channels
    Agent.onChange(Wreqr.radio._channels, onWreqrChannelChange);
    _.each(Wreqr.radio._channels, function(channel, channelName) {
      onNewWreqrChannel(channel, channelName);
    });
  }

  var onWreqrChannelChange = function(newValue, prop, action, difference, oldValue) {
    _.each(difference.added, function(channelName) {
      onNewWreqrChannel(newValue[channelName], channelName);
    });
  };

  var onNewWreqrChannel = function(channel, channelName) {
    var requests = Agent.getWreqrRequests(channel);
    var commands = Agent.getWreqrCommands(channel);
    var events = Agent.getWreqrEvents(channel);

    reportNewWreqrChannel(channel, channelName);

    // listen to newly registered or removed requests
    var handler = _.partial(onWreqrRequestChange, channel);
    Agent.onChange(requests, handler);
    Agent.invokeStorageUpdater(requests, handler);

    // listen for newly registered or removed commands
    var handler = _.partial(onWreqrCommandChange, channel);
    Agent.onChange(commands, handler);
    Agent.invokeStorageUpdater(commands, handler);

    // listen for newly registered or removed events
    var handler = _.partial(onWreqrEventChange, channel);
    Agent.onChange(events, handler);
    Agent.invokeStorageUpdater(events, handler);
  };

  var onWreqrRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeWreqrChannel(channel)
        });
      }
    });

    debug.log('channel request change', channel.channelName);
  };

  var onWreqrCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeWreqrChannel(channel)
        });
      }
    });

    debug.log('channel command change', channel.channelName);
  };

  var onWreqrEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeWreqrChannel(channel)
        });
      }
    });

    debug.log('channel event change', channel.channelName);
  };

  var reportNewWreqrChannel = function(channel, channelName) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:new', {
          channelName: channel.channelName,
          data: Agent.serializeWreqrChannel(channel)
        });
      }
    });
    debug.log('new channel', channel.channelName);
  };

  // we call the storage updater when we discover a new channel because
  // often we just created the channel because we're adding a new event, request, or command
  // this weird api is designed to match the one we're given be watch.js
  Agent.invokeStorageUpdater = function(storage, handler) {
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

}(this));