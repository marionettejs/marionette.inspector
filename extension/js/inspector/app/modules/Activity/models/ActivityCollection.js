define([
  'backbone',
  'app/modules/Activity/models/ActivityModel'
], function(Backbone, ActivityModel) {

  return Backbone.Collection.extend({
    model: ActivityModel
  });

})