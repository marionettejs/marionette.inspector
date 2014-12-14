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
      "agent:View:trigger": 'onViewTrigger'
    },

    initialize: function() {
      this.client = client;
    },

    setupData: function() {
      this.activityCollection = new ActivityCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    // See patchAppComponentTrigger.js for definition of event.data
    onViewTrigger: function(event) {
      logger.log('activity', 'new event', event.name);
      var activityModel = new ActivityModel(event.data);
      this.activityCollection.add(activityModel);
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
