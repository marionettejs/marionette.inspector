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
      'highlight-element': 'highlightElement',
      'unhighlight-element': 'unhighlightElement',
      'search:start': 'startSearch',
      'search:stop': 'stopSearch',
      'log': 'log'
    },

    clientEvents: {
      'agent:search': 'onSearch',
      'agent:View:new': 'onViewNew',
      'agent:View:remove': 'onViewRemove',
      'agent:view:change': 'onViewChange',
      'agent:ui:regionTree': 'onRegionTree'
    },

    uiRequests: {
      'view': 'requestView',
      'view:node': 'requestViewNode'
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

      // used for keeping track the cid of a view we want to show,
      // but hasn't been reported by the agent
      this._waitingForCid = undefined;
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
      Radio.connectRequests('ui', this.uiRequests, this);


      Marionette.bindEntityEvents(this, this.client, this.clientEvents);

      var regionTreeEvents = new ComponentReportToRegionTreeMap();
      Marionette.bindEntityEvents(this, regionTreeEvents, this.regionTreeEvents);
    },

    requestView: function(cid) {
      return this.viewCollection.findView(cid);
    },

    requestViewNode: function(cid) {
      return this.getViewNode(cid);
    },

    getViewNode: function(cid) {
      return this.uiData.findViewTreeNodeByCid(cid);
    },

    onAgentStart: function() {
      this.viewCollection.reset();
    },

    onRegionTree: function(regionTree) {
      this.uiData.set('regionTree', regionTree);
    },

    onViewNew: function (event) {
      logger.log('ui', 'new view', event.data.cid);

      var viewData = event.data;
      this.viewCollection.add(viewData);

      if (event.data.cid == this._waitingForCid) {
        this.showViewInfo(event.data.cid);
        this._waitingForCid = null;
      }
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

    onViewChange: function(event) {
      var cid = event.cid;
      logger.log('ui', 'onViewChange', cid);

      var view = this.viewCollection.findWhere({ cid: cid });
      if (!view) {
        logger.log('ui', 'could not find view');
        return;
      }

      view.set(event.data);
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
      logger.log('ui', 'search event ', data.name);

      var viewModel = this.viewCollection.findView(data.cid);
      if (!viewModel) {
        return;
      }

      viewModel.trigger('search:' + data.name);

      if (data.name == 'mousedown') {
        Radio.command('app', 'search:stop');
        Radio.command('app', 'navigate:knownObject', {
          type: 'View',
          cid: data.cid
        });
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
        this.printProperty(view);
      }, [data]);
    },

    highlightElement: function(data) {
      this.client.exec(function(data) {
        var view = this.getAppComponentByTypeAndCid('View', data.cid);
        var element = this.objectPath(view, data.path);
        this.highlightEl(element);
      }, [data]);
    },

    unhighlightElement: function(data) {
      this.client.exec(function(data) {
        this.unhighlightEl();
      }, [data]);
    },

    startSearch: function() {
      this.client.appObserverCall('startSearch');
    },

    stopSearch: function() {
      this.client.appObserverCall('stopSearch');
    },

    showViewInfo: function(cid) {
      var node = this.getViewNode(cid);
      if (!node) {
        return;
      }

      Radio.command('ui', 'show:more-info', {
        cid: cid,
        path: node.path
      });
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
        if (Radio.request('app', 'active:tool') != 'ui') {
          this.showModule();
        }

        var view = this.viewCollection.findView(cid);
        if (!view) {
          Radio.command('ui', 'show:loadingView', {
            cid: cid
          });

          logger.log('ui', 'couldnt find view', cid);
          this._waitingForCid = cid;
          return;
        }

        this.showViewInfo(cid);
      }
    }
  });
})
