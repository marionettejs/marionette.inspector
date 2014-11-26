define([
  'marionette',
  'util/Radio',
  'text!templates/devTools/data/collection-list.html',
  'app/modules/Data/views/CollectionRow',
], function(Marionette, Radio, tpl, CollectionRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: CollectionRow,

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
