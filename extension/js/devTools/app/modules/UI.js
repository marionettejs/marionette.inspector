define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'app/modules/UI/views/Layout'
], function(Marionette, Radio, Logger, Layout) {
  return Marionette.Module.extend({

    channelName: 'ui',
    appName: 'ui',

    initialize: function() {
      console.log('Radio App Initialized')
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = new Layout({});

      Radio.command('app', 'show:tool', this.appName, layout);
    },

    startModule: function() {
      Logger.debug('UI App Started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
