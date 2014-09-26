define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'app/modules/Radio/views/Layout'
], function(Marionette, Radio, Logger, Layout) {
  return Marionette.Module.extend({

    channelName: 'radio',

    initialize: function() {
      console.log('Radio App Initialized')
    },

    setupData: function() {
    },

    setupEvents: function() {
    },

    showModule: function() {
      var layout = new Layout({});

      Radio.command('app', 'show:tool', layout);
    },

    startModule: function() {
      console.log('Radio App Started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
      }
    }
  });
})
