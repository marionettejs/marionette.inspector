define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'app/modules/Radio/views/Layout'
], function(Marionette, Radio, logger, Module, Layout) {
  return Module.extend({

    channelName: 'radio',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    startModule: function() {
      logger.log('radio', 'started');
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
