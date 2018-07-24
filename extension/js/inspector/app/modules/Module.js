define([
  'marionette',
  'util/Radio',
  'logger'
], function(Marionette, Radio, logger) {

  return Marionette.MnObject.extend({

    channelName: '',

    constructor: function() {
      Marionette.MnObject.prototype.constructor.apply(this, arguments);
      this.setupData();
      this.setupEvents();
    },

    start: function() {
      this.triggerMethod('start');
    },

    stop: function() {
      this.triggerMethod('stop');
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = this.buildLayout();
      logger.log(this.channelName, 'showing ' + this.channelName);
      Radio.request('app', 'show:tool', this.channelName, layout);
    },

    controller: {}
  });
})
