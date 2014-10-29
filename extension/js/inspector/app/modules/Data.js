define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Data/views/Layout'
], function(Marionette, Radio, logger, Module, Layout) {
  return Module.extend({

    channelName: 'data',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    startModule: function() {
      logger.log('data', 'started');
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
