define([
  'backbone',
  'app/modules/Activity/models/Action'
], function(Backbone, Action) {

  var ActionCollection = Backbone.Collection.extend({

    model: Action,

    resetCollapse: function() {
      this.each(function(action) {
        action.isCollapsed = true;
      });
    },

    findByActionId: function(actionId) {
      return this.find(function(action) {
        return action.get('actionId') === actionId;
      });
    }

  });

  return ActionCollection;
});
