define([
  'backbone',
  'app/modules/Activity/models/ActivityNode'
], function(Backbone, ActivityNode) {

  return Backbone.Model.extend({

    defaults: {
      actionId: undefined,
      name: undefined
    },

    isCollapsed: true,

    getEvents: function() {
      var activityCollection = this.collection.activityCollection;
      var actionId = this.get('actionId');
      var root = ActivityNode.buildEvents(activityCollection, actionId);
      var action = root.nodes.models[0];
      return action;
    }

  });
});
