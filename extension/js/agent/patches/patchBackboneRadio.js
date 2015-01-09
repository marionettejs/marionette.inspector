;(function(Agent){

  Agent.patchBackboneRadio = function(Radio) {

    var Radio = Agent.patchedBackboneRadio = Radio;
    debug.log('Radio detected: ', Radio);

    // listen for new channels
    Agent.onChange(Radio._channels, onRadioChannelChange);
    _.each(Radio._channels, function(channel, channelName) {
      Agent.onNewRadioChannel(channel, channelName);
    });
  };

  var onRadioChannelChange = function(newValue, prop, action, difference, oldValue) {
    _.each(difference.added, function(channelName) {
        Agent.onNewRadioChannel(newValue[channelName], channelName);
    });
  };

  Agent.onNewRadioChannel = function(channel, channelName) {
    var requests = Agent.getRadioRequests(channel);
    var commands = Agent.getRadioCommands(channel);
    var events = Agent.getRadioEvents(channel);

    Agent.reportNewRadioChannel(channel, channelName);

    // listen to newly registered or removed requests
    var handler = _.partial(this.onRadioRequestChange, channel);
    Agent.onChange(requests, handler);
    Agent.invokeStorageUpdater(requests, handler);

    // listen for newly registered or removed commands
    var handler = _.partial(this.onRadioCommandChange, channel);
    Agent.onChange(commands, handler);
    Agent.invokeStorageUpdater(commands, handler);

    // listen for newly registered or removed events
    var handler = _.partial(Agent.onRadioEventChange, channel);
    Agent.onChange(events, handler);
    Agent.invokeStorageUpdater(events, handler);
  };

  Agent.onRadioRequestChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeChannelRadio(channel)
        });
      }
    });

    debug.log('channel request change', channel.channelName);
  };

  Agent.onRadioCommandChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeChannelRadio(channel)
        });
      }
    });

    debug.log('channel command change', channel.channelName);
  };

  Agent.onRadioEventChange = function(channel, newValue, prop, action, difference, oldvalue) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:change', {
          channelName: channel.channelName,
          data: Agent.serializeChannelRadio(channel)
        });
      }
    });

    debug.log('channel event change', channel.channelName);
  };

  Agent.reportNewRadioChannel = function(channel, channelName) {
    Agent.lazyWorker.push({
      context: Agent,
      args: [channel],
      callback: function() {
        Agent.sendAppComponentReport('Channel:new', {
          channelName: channel.channelName,
          data: Agent.serializeChannelRadio(channel)
        });
      }
    });

    debug.log('new channel', channel.channelName);
  };

}(this));