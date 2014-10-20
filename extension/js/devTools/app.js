define([
  'backbone',
  'marionette',
  'util/Radio',
  'util/Logger',
  'util/Router',
  'util/ModuleRoutes',
  'client',
  'app/views/Layout',
  'util/Logger',
], function(
  Backbone, Marionette, Radio, Logge, Router, moduleRoutes,
  Client, Layout, Logger) {

  return Marionette.Application.extend({

    commands: function() {
        return {
          'show:tool': this.showTool,
          'navigate': this.navigate
        }
    },

    onStart: function() {
      Logger.debug('app start');
      this.addRegions({layout: "[data-region='app-region']"});
      this.router = new Router(this, moduleRoutes);
      this.router.begin();

      this.setupData();
      this.setupEvents();
      this.layout.show(new Layout({
        model: this.appData
      }));

      this.client = new Client();
      this.listenTo(this.client, 'page:ready', function () {
        this.trigger('client:page:ready');
      });
      this.client.start();
    },

    setupData: function() {
      this.appData = new Backbone.Model();
    },

    setupEvents: function() {
      Radio.comply('app', this.commands, this);
    },

    showTool: function(tool, layout) {
      this.appData.set('tool', tool);
      this.layout.currentView.tool.show(layout);
    },

    navigate: function(route) {
      Logger.debug('app', 'navigate', route);
      this.router.navigate(route, {trigger: true});
    }

  });
});
