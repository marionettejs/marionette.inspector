define([
  'backbone',
  'underscore',
  'backboneAgentClient',
  ], function(Backbone, _, backboneAgentClient) {

  return Backbone.Model.extend({

    initialize: function() {
      this.backboneAgentClient = backboneAgentClient;
    },

    fetch: function() {
      this.getRegionTree();
    },

    getRegionTree: function() {
      this.backboneAgentClient.exec(function() {
        if (!this.appObserver) {
          return;
        }

        return this.appObserver.getRegionTree()
      }).then(_.bind(function(ret) {
        this.set('regionTree', ret);
      }, this));
    }
  });
});
