define([
  'marionette',
  'util/Radio',
  'logger',
  'client',
  'app/modules/Module',
  'app/modules/Activity/views/Layout',
  'app/modules/Activity/models/ActivityCollection',
], function(Marionette, Radio, logger, client, Module, Layout, ActivityCollection) {

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
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onViewTrigger: function(event) {
      logger.log('activity', 'new event', event.name);
      this.activityCollection.add([{
        name: event.name,
        data: event.data
      }]);
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
})
