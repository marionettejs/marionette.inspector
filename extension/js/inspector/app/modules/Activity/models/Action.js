define([
  'backbone'
], function(Backbone) {

  return Backbone.Model.extend({

    defaults: {
      actionId: undefined,
      name: undefined
    },
    isCollapsed: true

  });
});
