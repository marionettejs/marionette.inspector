define([
  'app/components/tree/views/Tree',
  'util/Radio',
  "text!templates/devTools/activity/tree.html",
], function(Tree, Radio, tpl) {

  var ActivityTree = Tree.extend({

    template: tpl,

    events: {
      'click': 'onShowInfo'
    },

    onShowInfo: function (evt) {
      evt.stopPropagation();
      if (this.model.get('event')) {
        Radio.command('activity', 'show:info', this.model.get('event'));

        this.setActiveNode(this.$el);
      }
    },

    serializeData: function () {
      var data = ActivityTree.__super__.serializeData.apply(this, arguments);
      data.isRoot = this.model.level === 0;
      return data;
    }
  });

  return ActivityTree;
});
