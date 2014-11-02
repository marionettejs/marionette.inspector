define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Data/views/Layout',
  'client'
], function(Marionette, Radio, logger, Module, Layout, client) {
  return Module.extend({

    channelName: 'data',

    clientEvents: {
      'agent:Model:new': 'onNewModel'
    },

    initialize: function() {
    },

    setupData: function() {
      this.client = client;
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onNewModel: function (event) {
      logger.log('data', 'new model', event);
      var data = event.data;
    },

    startModule: function() {
      logger.log('data', 'started');
    },

    buildLayout: function() {
      return new Layout({
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
