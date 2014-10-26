define([
  'marionette',
  'backbone',
  'util/Radio',
  'util/Logger',
  'client',
  'app/modules/UI/views/Layout',
  'app/modules/UI/models/UiData',
  'app/modules/UI/util/ComponentReportToRegionTreeMap'
], function(
  Marionette,
  Backbone,
  Radio,
  logger,
  client,
  Layout,
  UiData,
  ComponentReportToRegionTreeMap
) {

  return Marionette.Module.extend({

    channelName: 'ui',

    appName: 'ui',

    uiCommands: {
      'inspect:view-element': 'inspectViewElement',
      'inspect:view-function': 'inspectViewFunction',
      'highlight-view': 'highlightView',
      'unhighlight-view': 'unhighlightView',
      'search:start': 'startSearch',
      'search:stop': 'stopSearch',
      'log': 'log'
    },

    clientEvents: {
      'backboneAgent:search': 'onSearch'
    },

    regionTreeEvents: {
      'regionTree:update': 'onRegionTreeUpdate'
    },

    initialize: function() {
      this.client = client;
      this.setupData();
      this.setupEvents();

      _.bindAll(this, 'fetchData');
      this.fetchData = _.debounce(this.fetchData, 30);
    },

    setupData: function() {
      this.uiData = new UiData();
      this.viewList = new Backbone.Collection();
    },

    setupEvents: function() {
      Radio.connectCommands('ui', this.uiCommands, this);
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);

      var regionTreeEvents = new ComponentReportToRegionTreeMap();
      Marionette.bindEntityEvents(this, regionTreeEvents, this.regionTreeEvents);
    },

    /*
     * regionTree events come from the ComponentReportToRegionTreeMap
     */
    onRegionTreeUpdate: function() {
      logger.log('ui', 'region tree event');
      this.fetchData();
    },

    /*
     *
     * when the `backboneAgent` sends a search event it'll be in this form
     * ` { type: 'search', cid: 'view5, name: 'mouseover' } `
     *
     * The three types of events we get are `mouseover`, `mouseleave`, `mousedown`
     *
    */
    onSearch: function(data) {
      var viewModel = this.viewList.findWhere({cid: data.cid});
      if (!viewModel) {
        return;
      }

      viewModel.trigger('search:' + data.name);
    },

    fetchData: function() {
      logger.log('ui', 'fetching data');
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
      }, [data]);
    },

    highlightView: function(data) {
      this.client.appObserverCall('highlightView', data);
    },

    unhighlightView: function(data) {
      this.client.appObserverCall('unhighlightView', data);
    },

    startSearch: function() {
      this.client.appObserverCall('startSearch');
    },

    stopSearch: function() {
      this.client.appObserverCall('stopSearch');
    },

    showModule: function() {
      var layout = new Layout({
        model: this.uiData,
        collection: this.viewList
      });

      Radio.command('app', 'show:tool', this.appName, layout);
    },

    startModule: function() {
      logger.log('ui', 'Started');
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
