define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Radio/views/Layout'
], function(Marionette, Radio, logger, Layout) {
  return Marionette.Module.extend({

    channelName: 'radio',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = new Layout({});
      Radio.command('app', 'show:tool', 'radio', layout);
    },

    startModule: function() {
      logger.log('Radio', 'started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
