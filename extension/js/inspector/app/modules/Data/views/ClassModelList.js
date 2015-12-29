define([
  'marionette',
  'util/Radio',
  'text!templates/devTools/data/list.html',
  'app/modules/Data/views/ClassModelRow',
], function(Marionette, Radio, tpl, ClassModelRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ClassModelRow,

    dataCommands: {
      'unhighlight-rows': 'unhighlightRows'
    },

    initialize: function() {
      Radio.connectCommands('data', this.dataCommands, this);
    },

    unhighlightRows: function() {
      this.children.invoke('unhighlightRow');
    }
  });
});
