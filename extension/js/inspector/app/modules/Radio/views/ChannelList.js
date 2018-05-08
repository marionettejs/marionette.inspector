define([
  'marionette',
  'util/Radio',
  'app/modules/Radio/views/ChannelRow',
], function(Marionette, Radio, ChannelRow) {

  return Marionette.CompositeView.extend({
    template: 'radio/list.html',

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ChannelRow,

    radioCommands: {
      'unhighlight-rows': 'unhighlightRows'
    },

    initialize: function() {
      Radio.connectCommands('radio', this.radioCommands, this);
    },

    unhighlightRows: function() {
      this.children.invoke('unhighlightRow');
    }

  });

})
