define([
  'backbone',
  'marionette',
  'backbone.radio',
  'logger',
  'util/Router',
  'util/ModuleRoutes',
  'client',
  'app/views/Layout',
  'util/isViewType'
], function(
  Backbone, Marionette, Radio, logger, Router, moduleRoutes,
  client, Layout, isViewType) {

  return Marionette.Application.extend({

    channelName: 'app',

    radioRequests: {
      'show:tool': 'showTool',
      'navigate': 'navigate',
      'search:stop': 'stopSearch',
      'navigate:knownObject': 'navigateToKnowonObject',
      'active:tool': 'activeTool'
    },

    clientEvents: {
      'app:load-failed': 'onAppLoadFail',
      'agent:start': 'onAgentStart',
      'Application:new': 'onAppFound',
      'ready': 'onPageReady',
      'updated': 'onPageUpdated'
    },

    region: '.app',

    onStart: function() {
      this.modules = {};
      this.logger = logger;

      logger.log('app', 'start');

      this.client = client;
      this.router = new Router(this, moduleRoutes);
      this.router.begin();

      this.setupData();
      this.setupEvents();

      this.getRegion().show(new Layout({
        model: this.appData
      }));
    },

    setupData: function() {
      this.appData = new Backbone.Model({
        isAgentActive: false, // the inspector agent is injected into the inspected page
        isWaiting: false, // the inpector is waiting on the inspected page to load (document.readyState)
        hasStarted: false, // the inspector was started by user
        isInjecting: false, // the inspector is currently injecting the agent
        searchOn: false,  // inspector search
        tool: '' // active tool name
      });
    },

    setupEvents: function() {
      Marionette.bindEvents(this, this.client, this.clientEvents);
    },

    activeTool: function() {
      return this.appData.get('tool');
    },

    showTool: function(tool, layout) {
      logger.log('app', 'showing tool', tool);
      this.appData.set('tool', tool);
      this.getRegion().currentView.getRegion('tool').show(layout);
    },

    onPageReady: function() {
      logger.log('app', 'inspected page finished loading.');
      this.appData.set('isWaiting', false);

      if (this.appData.get('hasStarted') && !this.appData.get('isInjecting')) {
        logger.log('app', 'checking to see if the inspected page is active');
        this.client.agent.isActive(function(isActive) {
          if (!isActive) {
            logger.log('app', 'starting the client', this.appData.toJSON());
            this.appData.set('isInjecting', true);
            this.client.start();
          }
          logger.log('app', 'inspected page is active');
        }.bind(this))
      }
    },

    onPageUpdated: function(data) {

      if (data.urlChanged) {
        logger.log('app', 'inspected page had a url change');
        return;
      }

      logger.log('app', 'inspected page was updated (refreshed)');
      this.navigate('');
      this.appData.set('isWaiting', true);
      this.appData.set('isAgentActive', false);


      // For some reason we'll think that the page refrehsed when it really
      // just got touched in some way...
      // In that case we should check to see if the agent is still around.
      // If it is we're okay. if not a page reload will really happen and
      // we'll re-inject the agent.
      logger.log('app', 'checking to see if the inspected page is active');
      this.client.agent.isActive(function(isActive) {
        if (isActive) {
          logger.log('app', 'inspected page is still active');
          this.navigate('');
          this.appData.set('isWaiting', false);
          this.appData.set('isAgentActive', true);
          Radio.trigger('app', 'agent:start');
        }
      }.bind(this))
    },

    onAgentStart: function() {
      logger.log('app', 'agent was injected');
      this.appData.set('isAgentActive', true);
      this.appData.set('isInjecting', false);
      Radio.trigger('app', 'agent:start');
      this.navigate('ui');
    },

    onAppFound: function() {
      logger.log('app', 'inspected application was found');
      this.appData.set('hasLoadFailed', false);
    },

    onAppLoadFail: function() {
      logger.log('app', 'could not find inspected application');
      this.appData.set('hasLoadFailed', true);
    },

    stopSearch: function() {
      this.appData.set('searchOn', false);
    },

    navigate: function(route, options) {
      logger.log('app', 'navigate', route);
      options = options || {};

      var shouldReplace = _.isUndefined(options.replace) ? true : options.replace;
      this.router.navigate(route, {trigger: true});
    },

    navigateToKnowonObject: function(data) {
      var object = data.object || data;
      if (!object) {
        return;
      }

      if (object.type == "type-backbone-model") {
        var url = 'data/models/'+object.cid;
        this.navigate(url);
      } else if (isViewType(object)) {
        var url = 'data/views/'+object.cid;
        this.navigate(url);
      }

    },

  });
});
