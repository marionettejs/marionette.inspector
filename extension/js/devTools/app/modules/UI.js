define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'client',
  'app/modules/UI/views/Layout',
  'app/modules/UI/models/UiData'
], function(Marionette, Radio, Logger, Client, Layout, UiData) {
  return Marionette.Module.extend({

    channelName: 'ui',

    appName: 'ui',

    uiCommands: {
      'link-to:element': 'linkToElement'
    },

    initialize: function() {
      console.log('Radio App Initialized');
      this.client = new Client();
      this.setupData();
      this.setupEvents();
    },

    setupData: function() {
      this.uiData = new UiData();
      // setInterval(_.bind(this.fetchData, this), 500);
    },

    setupEvents: function() {
      Radio.connectCommands('ui', this.uiCommands, this);
    },

    fetchData: function() {
      this.uiData.fetch();
    },

    linkToElement: function(viewPath) {
      this.client.exec(function(viewPath) {
        var view = this.appObserver.getView(viewPath);
        var element = view.el;
        console.log('link to element', element);
        inspect(element);
      }, [viewPath])
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
        this.fetchData();
      }
    }
  });
})
