define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Data/views/Layout'
], function(Marionette, Radio, logger, Layout) {
  return Marionette.Module.extend({

    channelName: 'data',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = new Layout({});
      Radio.command('app', 'show:tool', 'data', layout);
    },

    startModule: function() {
      logger.log('data', 'started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
