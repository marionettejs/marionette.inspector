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

    isDetatched: function() {
      return !this.viewNode();
    },

    getName: function() {
      var viewNode = this.viewNode();

      if (viewNode) {
        return viewNode.name;
      } else {
        return this.get('inspect').inspect;
      }
    },

    viewNode: function() {
      return Radio.request('ui', 'view:node',  this.get('cid'));
    },

    viewModel: function() {
      if (!this.get('model')) {
        return
      }

      return Radio.request('data', 'model', this.get('model').cid)
    }
  });
})