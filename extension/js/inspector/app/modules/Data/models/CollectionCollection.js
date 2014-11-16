define([
  'backbone',
  'app/modules/Data/models/CollectionModel'
], function(Backbone, CollectionModel) {

  return Backbone.Collection.extend({
    model: CollectionModel
  });

})