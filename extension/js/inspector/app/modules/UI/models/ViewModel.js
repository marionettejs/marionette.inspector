define([
  'backbone',
  'util/clientInspect',
  'util/Radio',
], function(Backbone, clientInspect, Radio) {
  return Backbone.Model.extend({
    clientInspect: function(path) {
      clientInspect({
        type: 'View',
        cid: this.get('cid'),
        path: path
       });
    },

    viewModel: function() {
      if (!this.get('model')) {
        return
      }

      return Radio.request('data', 'model', this.get('model').cid)
    }
  });
})