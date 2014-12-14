define([
  'app/components/tree/views/Tree',
  'util/Radio',
  "text!templates/devTools/activity/tree.html",
], function(Tree, Radio, tpl) {

  var ActivityTree = Tree.extend({

    template: tpl,

    serializeData: function () {
      var data = ActivityTree.__super__.serializeData.apply(this, arguments);
      data.isRoot = this.model.level === 0;
      return data;
    }
  });

  return ActivityTree;
});
