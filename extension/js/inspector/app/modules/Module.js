define([
  'marionette',
  'util/Radio',
], function(Marionette, Radio) {

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
      Radio.command('app', 'show:tool', this.channelName, layout);
    },

    controller: {}
  });
})
