define([
  'backbone',
  'app/modules/UI/models/ViewModel'
], function(Backbone, ViewModel) {

  return Backbone.Collection.extend({
    model: ViewModel
  });

})