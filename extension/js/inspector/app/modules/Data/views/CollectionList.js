define([
  'marionette',
  'util/Radio',
  'app/modules/Data/views/CollectionRow',
], function(Marionette, Radio, CollectionRow) {

  return Marionette.CompositeView.extend({
    template: 'data/collection-list.html',

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
