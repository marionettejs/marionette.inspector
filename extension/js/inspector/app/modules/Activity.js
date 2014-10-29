define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Activity/views/Layout'
], function(Marionette, Radio, logger, Module, Layout) {

  return Module.extend({

    channelName: 'activity',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    startModule: function() {
      logger.log('activity', 'started');
    },

    buildLayout: function() {
      return new Layout({
      });
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
