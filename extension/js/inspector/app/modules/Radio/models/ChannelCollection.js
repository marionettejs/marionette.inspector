define([
  'backbone',
  'app/modules/Radio/models/ChannelModel'
], function(Backbone, ChannelModel) {

  return Backbone.Collection.extend({
    model: ChannelModel,

    findChannel: function(channelName) {
      return this.findWhere({channelName: channelName});
    }
  });

})