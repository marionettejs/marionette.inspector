define([
  'backbone',
  'marionette',
  'util/Radio',
  'logger',
  'client',
  'app/modules/Module',
  'app/modules/Activity/views/Layout',
  'app/modules/Activity/models/Action',
  'app/modules/Activity/models/ActivityModel',
  'app/modules/Activity/models/ActivityCollection',
  'app/modules/Activity/models/ActionCollection',
], function(Backbone, Marionette, Radio, logger, client, Module, Layout, Action, ActivityModel, ActivityCollection, ActionCollection) {

  return Module.extend({

    channelName: 'activity',

    lastActivityModel: undefined,

    clientEvents: {
      "agent:trigger": 'onTrigger',
    },

    activityRequests: {
      'view:activity': 'requestViewActivity'
    },

    initialize: function() {
      this.client = client;
    },

    setupData: function() {
      this.activityCollection = new ActivityCollection();
      this.actionCollection = new ActionCollection();
    },

    setupEvents: function() {
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
      Radio.connectRequests('activity', this.activityRequests, this);
    },

    requestViewActivity: function(data) {
      return this.activityCollection.filterByContextCid(data.cid);
    },

    // See patchAppComponentTrigger.js for definition of event.data
    onTrigger: function(event) {
      logger.log('activity', 'new event', event.name);

      this.activityCollection.add(event.data);

      if (this.actionCollection.findWhere({ actionId: event.data.actionId }) === undefined) {
        var actionId = event.data.actionId;
        this.actionCollection.add(new Action({
          actionId: actionId,
          name: 'Action ' + actionId.substring(1)
        }));
      }
    },

    startModule: function() {
      logger.log('activity', 'started');
    },

    buildLayout: function() {
      return new Layout({
        activityCollection: this.activityCollection,
        actionCollection: this.actionCollection
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
