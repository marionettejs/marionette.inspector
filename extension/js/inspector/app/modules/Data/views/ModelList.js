define([
  'marionette',
  'util/Radio',
  'app/modules/Data/views/ModelRow',
], function(Marionette, Radio, ModelRow) {

  return Marionette.CompositeView.extend({
    template: 'data/list.html',

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
