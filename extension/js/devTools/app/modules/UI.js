define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'client',
  'app/modules/UI/views/Layout',
  'app/modules/UI/models/UiData'
], function(Marionette, Radio, Logger, client, Layout, UiData) {
  return Marionette.Module.extend({

    channelName: 'ui',

    appName: 'ui',

    uiCommands: {
      'inspect:view-element': 'inspectViewElement',
      'inspect:view-function': 'inspectViewFunction',
      'log': 'log'
    },

    clientEvents: {
      'backboneAgent:regionTree:updated': 'onRegionTreeUpdated'
    },

    initialize: function() {
      console.log('Radio App Initialized');
      this.client = client;
      this.setupData();
      this.setupEvents();

      _.bindAll(this, 'fetchData');
      this.fetchData = _.debounce(this.fetchData, 30);
    },

    setupData: function() {
      this.uiData = new UiData();
      // setInterval(_.bind(this.fetchData, this), 500);
    },

    setupEvents: function() {
      Radio.connectCommands('ui', this.uiCommands, this);
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    onRegionTreeUpdated: function() {
      this.fetchData();
    },

    fetchData: function() {
      this.uiData.fetch();
    },

    inspectViewElement: function(data) {
      this.client.exec(function(data) {
        var view = this.appObserver.getView(data.viewPath);
        var element = this.objectPath(view, data.viewPropPath);

        // if it's a jQuery element, get the dom element
        element = element.length ? element[0] : element;

        inspect(element);
      }, [data])
    },

    inspectViewFunction: function(data) {
      this.client.exec(function(data) {
        var view = this.appObserver.getView(data.viewPath);
        var fnc = this.objectPath(view, data.viewPropPath);

        if (fnc.toString().match(/native code/)) {
          console.log('Mn: ', fnc);
          return;
        }

        inspect(fnc);
      }, [data])
    },

    log: function(data) {
      this.client.exec(function(data) {
        var view = this.appObserver.getView(data.viewPath);
        window.temp = view;
        console.log('MN: temp = ', view);
      }, [data])
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
