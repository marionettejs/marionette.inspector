define([
  'backbone',
  'util/clientInspect'
], function(Backbone, clientInspect) {
  return Backbone.Model.extend({
    clientInspect: function(funcName) {
      clientInspect({
        type: 'Model',
        cid: this.get('cid'),
        path: funcName
       });
    },
  });
})