define([
  'marionette',
  'util/radio',
  'text!templates/devTools/radio/list.html',
  'app/modules/Radio/views/ChannelRow',
], function(Marionette, Radio, tpl, ChannelRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

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
