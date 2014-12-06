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

    clientEvents: {
      "agent:View:trigger": 'onViewTrigger'
    },

    initialize: function() {
      this.client = client;
      // this.listenTo(this.client, 'all', function(event) {
      //   console.log(event, arguments);
      // })
    },

    setupData: function() {
      this.activityCollection = new ActivityCollection();
      this.allActivityCollection = new ActivityCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onViewTrigger: function(event) {
      logger.log('activity', 'new event', event.name);
      var activityModel = new ActivityModel(event.data);

      // Add all trigger events to "all" collection
      this.allActivityCollection.add(activityModel);

      // Add only trigger events with listeners to primary collection
      if (activityModel.get('listeners').length) {
        this.activityCollection.add(activityModel);
      }
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
