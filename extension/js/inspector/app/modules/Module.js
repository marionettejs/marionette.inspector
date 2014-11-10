define([
  'marionette',
  'util/Radio',
  'logger'
], function(Marionette, Radio, logger) {

  return Marionette.Module.extend({

    channelName: '',

    constructor: function() {
      Marionette.Module.prototype.constructor.apply(this, arguments);
      this.setupData();
      this.setupEvents();
    },

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = this.buildLayout();
      logger.log(this.channelName, 'showing ' + this.channelName);
      Radio.command('app', 'show:tool', this.channelName, layout);
    },

    controller: {}
  });
})
