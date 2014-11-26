define([
  'marionette',
  'util/Radio',
  'text!templates/devTools/data/list.html',
  'app/modules/Data/views/ModelRow',
], function(Marionette, Radio, tpl, ModelRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ModelRow,

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

})
