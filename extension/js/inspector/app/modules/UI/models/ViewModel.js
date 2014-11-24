define([
  'backbone',
  'util/clientInspect'
], function(Backbone, clientInspect) {
  return Backbone.Model.extend({
    clientInspect: function(path) {
      clientInspect({
        type: 'View',
        cid: this.get('cid'),
        path: path
       });
    },
  });
})