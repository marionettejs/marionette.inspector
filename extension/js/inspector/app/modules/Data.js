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
      'agent:Model:new': 'onModelNew',
      'agent:Model:destroy': 'onModelDestroy'
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

    onModelNew: function (event) {
      logger.log('data', 'model:new', event.data.cid);

      var modelData = event.data;
      this.modelCollection.add(modelData);
    },

    onModelDestroy: function (event) {
      var cid = event.data.cid;
      logger.log('data', 'model:destroy', cid);

      var model = this.modelCollection.findWhere({cid: cid});
      if (!model) {
        logger.log('data', 'model:destroy could not find model');
        return;
      }

      model.set('isDestroyed', true)
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
