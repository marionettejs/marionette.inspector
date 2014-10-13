define([
  'backbone',
  'marionette',
  'util/Radio',
  'util/Logger',
  'util/Router',
  'util/ModuleRoutes',
  'inspectedPageClient',
  'backboneAgentClient',
  'app/views/Layout',
  'util/Logger',
], function(
  Backbone, Marionette, Radio, Logge, Router, moduleRoutes,
  inspectedPageClient, backboneAgentClient, Layout, Logger) {

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


      this.backboneAgentClient = backboneAgentClient;
      this.inspectedPageClient = inspectedPageClient;

      this.setupInspectedPageClient();
      this.startBackboneAgentClient();
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
    },

    setupInspectedPageClient: function() {

      this.debugMode = false;

      this.listenTo(inspectedPageClient, "updated", _.bind(function(updateDetails) {
          if (inspectedPageClient.isInjecting) {
              // we are injecting scripts into the inspected page
              // => reload the panel to wait for injected scripts loading (i.e. backbone agent)
              // window.location.href = "";
          } else {
              // if the inspected page still has the backbone agent, then the update isn't a
              // "real one" (e.g. is an hash change / push state, etc.) and we can ignore it.
              // Note: as a side effect, if the agent isn't in the inspected page because we are
              // in a waiting or debug disabled view, than the update is always considered as real
              backboneAgentClient.isActive(_.bind(function(isActive) {
                  if (!isActive) { // the update is "real"
                      if (updateDetails.urlChanged || !this.debugMode) {
                          // the user moved to another page/app/site or refreshed the page
                          // while not in debug mode
                          // => reload the panel to show the view for activating debugging

                          // something weird
                          // window.location.href = "";
                      } else {
                          // the update is a refresh while in debug mode
                          // => reinject the backbone agent to keep the debug mode running
                          this.restartAppInDebugMode();
                      }
                  }
              }, this));
          }

          //window.location.href = "";
      }, this));

    },

    startBackboneAgentClient: function() {
      backboneAgentClient.activate();
    }

  });
});
