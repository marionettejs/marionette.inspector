define([
  'backbone',
  'marionette',
  'util/Radio',
  'util/Logger',
  'util/Router',
  'util/ModuleRoutes',
  'client',
  'app/views/Layout',
], function(
  Backbone, Marionette, Radio, logger, Router, moduleRoutes,
  client, Layout) {

  return Marionette.Application.extend({

    commands: function() {
        return {
          'show:tool': this.showTool,
          'navigate': this.navigate
        }
    },

    clientEvents: {
      'ready': 'triggerPageReady',
      'app:load-failed': 'onAppLoadFail'
    },

    onStart: function() {
      this.logger = logger;

      logger.log('app', 'start');

      this.addRegions({layout: "[data-region='app-region']"});
      this.client = client;
      this.router = new Router(this, moduleRoutes);
      this.router.begin();

      this.setupData();
      this.setupEvents();

      this.layout.show(new Layout({
        model: this.appData
      }));

      this.client.start();
    },

    setupData: function() {
      this.appData = new Backbone.Model();
    },

    setupEvents: function() {
      Radio.comply('app', this.commands, this);
      Marionette.bindEntityEvents(this, this.client, this.clientEvents);
    },

    showTool: function(tool, layout) {
      this.appData.set('tool', tool);
      this.layout.currentView.tool.show(layout);
    },

    triggerPageReady: function() {
      this.trigger('client:page:ready');
    },

    onAppLoadFail: function() {
      this.appData.set('hasLoadFailed', true);
    },

    navigate: function(route) {
      logger.log('app', 'navigate', route);
      this.router.navigate(route, {trigger: true});
    }

  });
});
