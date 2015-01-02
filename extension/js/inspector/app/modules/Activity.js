define([
  'marionette',
  'util/Radio',
  'logger',
  'client',
  'app/modules/Module',
  'app/modules/Activity/views/Layout',
  'app/modules/Activity/models/ActivityModel',
  'app/modules/Activity/models/ActivityCollection',
], function(Marionette, Radio, logger, client, Module, Layout, ActivityModel, ActivityCollection) {

  return Module.extend({

    channelName: 'activity',

    lastActivityModel: undefined,

    clientEvents: {
      "agent:View:trigger": 'onTrigger',
      "agent:Model:trigger": 'onTrigger'
    },

    activityRequests: {
      'view:activity': 'requestViewActivity'
    },

    initialize: function() {
      this.client = client;
    },

    setupData: function() {
      this.activityCollection = new ActivityCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
      Radio.connectRequests('activity', this.activityRequests, this);
    },

    requestViewActivity: function(data) {
      return this.activityCollection.byContextCid(data.cid);
    },

    // See patchAppComponentTrigger.js for definition of event.data
    onTrigger: function(event) {
      logger.log('activity', 'new event', event.name);

      this.activityCollection.add(event.data);
    },

    startModule: function() {
      logger.log('activity', 'started');
    },

    buildLayout: function() {
      return new Layout({
        activityCollection: this.activityCollection
      });
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
});
