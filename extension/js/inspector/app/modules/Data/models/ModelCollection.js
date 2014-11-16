define([
  'backbone',
  'app/modules/Data/models/ModelModel'
], function(Backbone, ModelModel) {

  return Backbone.Collection.extend({
    model: ModelModel,

    findModel: function(cid) {
      return this.findWhere({cid: cid});
    }

  });

})