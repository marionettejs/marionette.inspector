define([
  'marionette',
  'util/Radio',
  'util/Logger',
  'util/Router',
  'util/ModuleRoutes',
  'app/views/Layout',
  'util/Logger',
], function(Marionette, Radio, Logge, Router, moduleRoutes, Layout, Logger) {

  return Marionette.Application.extend({

    commands: function() {
        return {
          'show:tool': this.showTool
        }
    },


    onStart: function() {
      console.log('app start');
      this.addRegions({layout: "[data-region='app-region']"});
      this.router = new Router(this, moduleRoutes);
      this.router.begin();

      this.setupEvents();
      this.layout.show(new Layout());
    },

    setupEvents: function() {
      Radio.comply('app', this.commands, this);
    },


    showTool: function(layout) {
      this.layout.currentView.tool.show(layout);
    },

     navigate: function(route) {
       Logger.debug('app', 'navigate', route);
       this.router.navigate(route, {trigger: true});
     },

  });
});
