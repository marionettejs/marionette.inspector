define([
  'app/components/tree/views/Tree',
  'util/Radio',
  "text!templates/devTools/components/tree/tree.html",
], function(Tree, Radio, tpl) {
  return Tree.extend({

    template: tpl,

    ui: {
    },

    events: {
    },

    attributes: function() {
      var data = {};
      data['data-view'] = 'tree-view';
      data['data-cid'] = this.model.get('cid');
      return data;
    }
  });
});
