define([
  'marionette',
  'util/Radio',
  'logger',
  'app/modules/Activity/views/Layout'
], function(Marionette, Radio, logger, Layout) {
  return Marionette.Module.extend({

    channelName: 'activity',

    initialize: function() {
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = new Layout({});
      Radio.command('app', 'show:tool', 'activity', layout);
    },

    startModule: function() {
      logger.log('activity', 'started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
