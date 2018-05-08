define([
  'marionette',
  "util/Radio",
  'app/modules/Radio/views/ChannelList',
  'app/modules/Radio/views/ChannelInfo',
], function(Marionette, Radio, ChannelList, ChannelInfo) {

  return Marionette.View.extend({

    template: "radio/layout.html",

    regions: {
      channelList: '[data-region="channel-list"]',
      channelInfo: '[data-region="channel-info"]',
    },

    attributes: {
      view: 'radio-layout'
    },

    className: 'app-tool',

    radioCommands: {
      'show:info': 'showInfo',
      'library:version': 'libraryVersion'
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
    },

    libraryVersion: function() {
      var loadInfo = Radio.request('app', 'load:info');
      return loadInfo.radio
    }

  });
});
