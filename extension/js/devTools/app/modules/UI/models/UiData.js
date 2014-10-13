define([
  'backbone',
  'underscore',
  'backboneAgentClient',
  ], function(Backbone, _, backboneAgentClient) {
  return Backbone.Model.extend({

    initialize: function() {
      this.backboneAgentClient = backboneAgentClient;
    },

    getRegionTree: function() {
      this.backboneAgentClient.exec(function() {
        return this.appObserver.getRegionTree()
      }).then(_.bind(function(ret) {
        this.set('regionTree', ret);
      }, this));
    }
  });
});
