define([
  'marionette',
  "text!templates/devTools/radio/layout.html",
  "util/Radio",
  'app/modules/Radio/views/ChannelList',
  'app/modules/Radio/views/ChannelInfo',
], function(Marionette, tpl, Radio, ChannelList, ChannelInfo) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      channelList: '[data-region="channel-list"]',
      channelInfo: '[data-region="channel-info"]',
    },

    attributes: {
      view: 'radio-layout'
    },

    className: "row",

    radioCommands: {
      'show:info': 'showInfo'
    },

    initialize: function(options) {
      Radio.connectCommands('radio', this.radioCommands, this);
    },

    onRender: function() {
      this.getRegion('channelList').show(new ChannelList({
        collection: this.options.channelCollection
      }))
    },

    showInfo: function(channelModel) {
      this.getRegion('channelInfo').show(new ChannelInfo({
        model: channelModel
      }));
    }

  });
});
