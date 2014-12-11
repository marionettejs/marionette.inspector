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
    },

    setupData: function() {
      this.filteredActivities = new ActivityCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onViewTrigger: function(event) {
      logger.log('activity', 'new event', event.name);
      var activity = new ActivityModel(event.data);

      // Add only trigger events with listeners to primary collection
      if (activity.get('listeners').length) {
        this.filteredActivities.add(activity);
      }
    },

    startModule: function() {
      logger.log('activity', 'started');
    },

    buildLayout: function() {
      return new Layout({
        activities: this.filteredActivities
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
