define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'app/modules/UI/views/Layout',
  'app/modules/UI/models/UiData'
], function(Marionette, Radio, Logger, Layout, UiData) {
  return Marionette.Module.extend({

    channelName: 'ui',
    appName: 'ui',

    initialize: function() {
      console.log('Radio App Initialized');
      this.setupData();
      this.setupEvents();
    },

    setupData: function() {
      this.uiData = new UiData();
      setInterval(_.bind(this.fetchData, this), 500);
    },

    setupEvents: function() {
    },

    fetchData: function() {
      this.uiData.fetch();
    },

    showModule: function() {
      var layout = new Layout({
        model: this.uiData
      });

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
