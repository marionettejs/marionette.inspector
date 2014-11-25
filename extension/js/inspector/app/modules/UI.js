define([
  'marionette',
  'backbone',
  'util/Radio',
  'logger',
  'app/modules/Module',
  'client',
  'app/modules/UI/views/Layout',
  'app/modules/UI/models/UiData',
  'app/modules/UI/models/ViewCollection',
  'app/modules/UI/util/ComponentReportToRegionTreeMap'
], function(
  Marionette,
  Backbone,
  Radio,
  logger,
  Module,
  client,
  Layout,
  UiData,
  ViewCollection,
  ComponentReportToRegionTreeMap
) {

  return Module.extend({

    channelName: 'ui',

    appName: 'ui',

    uiCommands: {
      'highlight-view': 'highlightView',
      'unhighlight-view': 'unhighlightView',
      'search:start': 'startSearch',
      'search:stop': 'stopSearch',
      'log': 'log'
    },

    clientEvents: {
      'agent:search': 'onSearch',
      'agent:View:new': 'onViewNew',
      'agent:View:remove': 'onViewRemove',
      'agent:view:ui:change': 'onViewUIChange'
    },

    appEvents: {
      'agent:start': 'onAgentStart'
    },

    regionTreeEvents: {
      'regionTree:update': 'onRegionTreeUpdate'
    },

    initialize: function() {
      this.client = client;
      _.bindAll(this, 'fetchData');
      this.fetchData = _.debounce(this.fetchData, 30);
    },

    setupData: function() {
      this.uiData = new UiData();
      this.viewCollection = new ViewCollection();
      this.moduleData = new Backbone.Model({
        searchOn: false
      });
    },

    setupEvents: function() {
      Radio.connectCommands('ui', this.uiCommands, this);
      Radio.connectEvents('app', this.appEvents, this);

      Marionette.bindEntityEvents(this, this.client, this.clientEvents);

      var regionTreeEvents = new ComponentReportToRegionTreeMap();
      Marionette.bindEntityEvents(this, regionTreeEvents, this.regionTreeEvents);
    },

    onAgentStart: function() {
      this.viewCollection.reset();
    },

    onViewNew: function (event) {
      logger.log('ui', 'new view', event.data.cid);

      var viewData = event.data;
      this.viewCollection.add(viewData);
    },

    onViewRemove: function (event) {
      var cid = event.data.cid;
      logger.log('ui', 'could not find view');

      var view = this.viewCollection.findWhere({cid: cid});
      if (!view) {
        logger.log('ui', 'onViewRemove could not find view');
        return;
      }

      view.set('isRemoved', true)
    },

    onViewUIChange: function(event) {
      var cid = event.cid;
      logger.log('ui', 'onViewUIChange', cid);

      var view = this.viewCollection.findWhere({ cid: cid });
      if (!view) {
        logger.log('ui', 'could not find view');
        return;
      }

      view.set('ui', event.data.ui);
    },


    /*
     * regionTree events come from the ComponentReportToRegionTreeMap
     */
    onRegionTreeUpdate: function() {
      this.fetchData();
    },

    /*
     *
     * when the `agent` sends a search event it'll be in this form
     * ` { type: 'search', cid: 'view5, name: 'mouseover' } `
     *
     * The three types of events we get are `mouseover`, `mouseleave`, `mousedown`
     *
    */
    onSearch: function(data) {
      var viewModel = this.viewCollection.findView(data.cid);
      if (!viewModel) {
        return;
      }

      logger.log('ui', 'search event ', data.name);
      viewModel.trigger('search:' + data.name);

      if (data.name == 'mousedown') {
        Radio.command('app', 'search:stop');
        Radio.command('ui', 'highlightRow', data)
      }

    },

    fetchData: function() {
      logger.log('ui', 'fetching data');
      this.uiData.fetch();
      this.uiData.trigger('change:regionTree');
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

    buildLayout: function() {
      return new Layout({
        model: this.uiData,
        moduleData: this.moduleData,
        viewCollection: this.viewCollection,
        collection: new Backbone.Collection()
      });
    },

    startModule: function() {
      logger.log('ui', 'Started');
    },

    controller: {
      index: function() {
        this.startModule();
        this.showModule();
        this.fetchData();
      },
      showView: function(cid) {
        this.showModule();
        var view = this.viewCollection.findView(cid);
        Radio.command('ui', 'show:more-info', {
          cid: cid,
          path: view.treeProperties.path
        });

      }
    }
  });
})
