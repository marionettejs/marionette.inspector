define([
  'marionette',
  'util/Radio',
  'logger',
  'client',
  'app/modules/Module',
  'app/modules/Radio/views/Layout',
  'app/modules/Radio/models/ChannelCollection',
], function(Marionette, Radio, logger, client, Module, Layout, ChannelCollection) {
  return Module.extend({

    channelName: 'radio',

    clientEvents: {
      'agent:Channel:new': 'onChannelNew',
      'agent:Channel:change': 'onChannelChange'
    },

    initialize: function() {
      this.client = client;
    },

    setupData: function() {
      this.channelCollection = new ChannelCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onChannelChange: function (event) {
      logger.log('radio', 'channel change', event.channelName);
      var channel = this.channelCollection.findChannel(event.channelName);
      channel.set(event.data);
    },

    onChannelNew: function(event) {
      logger.log('radio', 'channel new', event.channelName);
      var channel = this.channelCollection.findChannel(event.channelName);
      if (channel) {
        channel.set(event.data);
      } else {
        this.channelCollection.add([event.data]);
      }
    },

    startModule: function() {
      logger.log('radio', 'started');
    },

    buildLayout: function() {
      return new Layout({
        channelCollection: this.channelCollection
      });
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
