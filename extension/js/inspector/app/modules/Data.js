define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Data/views/Layout',
  'client',
  'app/modules/Data/models/ModelCollection',
], function(Marionette, Radio, logger, Module, Layout, client, ModelCollection) {
  return Module.extend({

    channelName: 'data',

    clientEvents: {
      'agent:Model:new': 'onNewModel'
    },

    initialize: function() {
    },

    setupData: function() {
      this.client = client;
      this.modelCollection = new ModelCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onNewModel: function (event) {
      logger.log('data', 'new model', event);

      var modelData = event.data;
      this.modelCollection.add(modelData);
    },

    startModule: function() {
      logger.log('data', 'started');
    },

    buildLayout: function() {
      return new Layout({
        modelCollection: this.modelCollection
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
