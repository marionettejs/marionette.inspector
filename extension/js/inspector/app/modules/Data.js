define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Data/views/Layout',
  'client',
  'app/modules/Data/models/ModelCollection',
  'app/modules/Data/models/CollectionCollection',
  'app/modules/Data/models/ClassCollection'
], function(Marionette, Radio, logger, Module, Layout, client, ModelCollection, CollectionCollection, ClassCollection) {
  return Module.extend({

    channelName: 'data',

    clientEvents: {
      'agent:Model:new': 'onModelNew',
      'agent:Model:destroy': 'onModelDestroy',
      'agent:Collection:new': 'onCollectionNew',
      'agent:model:attributes:change': 'onModelAttributesChange',
      'agent:model:events:change': 'onModelEventsChange'
    },

    appEvents: {
      'agent:start': 'onAgentStart'
    },

    dataRequests: {
      'model': 'requestModel',
    },

    dataCommands: {
      'log': 'log'
    },

    initialize: function() {
    },

    setupData: function() {
      this.client = client;
      this.modelCollection = new ModelCollection();
      this.collectionCollection = new CollectionCollection();
      this.classCollection = new ClassCollection();

      this.modelGraveyard = new ModelCollection();
      this.collectionGraveyard = new CollectionCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
      Radio.connectEvents('app', this.appEvents, this);
      Radio.connectRequests('data', this.dataRequests, this);
      Radio.connectCommands('data', this.dataCommands, this);
    },

    requestModel: function(cid) {
      return this.modelCollection.findModel(cid)
    },

    onAgentStart: function() {
      this.collectionCollection.reset();
      this.modelCollection.reset();
      this.classCollection.reset();
      this.modelGraveyard.reset();
      this.collectionGraveyard.reset();
    },

    onModelNew: function (event) {
      logger.log('data', 'model:new', event.data.cid);

      var modelData = event.data;
      this.modelCollection.add(modelData);
      this.classCollection.add(modelData);
    },

    onCollectionNew: function (event) {
      logger.log('data', 'collection:new', event.data.cid);

      var collectionData = event.data;
      this.collectionCollection.add(collectionData);
    },


    onModelDestroy: function (event) {
      var cid = event.data.cid;
      logger.log('data', 'model:destroy', cid);

      var model = this.modelCollection.findWhere({cid: cid});
      if (!model) {
        logger.log('data', 'model:destroy could not find model');
        return;
      }

      model.set('isDestroyed', true);
      this.modelCollection.remove(model);
      this.modelGraveyard.add(model);
    },

    onModelAttributesChange: function(event) {
      var model = this.modelCollection.findModel(event.cid);
      if (!model) {
        return;
      }

      model.set(event.data);
    },

    onModelEventsChange: function(event) {
      var model = this.modelCollection.findModel(event.cid);
      if (!model) {
        return;
      }

      model.set(event.data);
    },

    log: function(data) {
      this.client.exec(function(data) {
        var model = this.getAppComponentByTypeAndCid('Model', data.cid);
        this.printProperty(model);
      }, [data]);
    },

    startModule: function() {
      logger.log('data', 'started');
    },

    buildLayout: function() {
      return new Layout({
        modelCollection: this.modelCollection,
        classCollection: this.classCollection,
        collectionCollection: this.collectionCollection
      });
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      },

      showModel: function(cid) {
        this.showModule();

        var model = this.modelCollection.findModel(cid);
        Radio.command('data', 'show:info', {
          type: 'model',
          instance: model
        });
      },
    }
  });
})
