define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/info.html",
  'app/behaviors/SidebarPanes'
], function(Marionette, Radio, tpl, SidebarPanesBehavior) {

  return Marionette.ItemView.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    },

    modelEvents: {
      'change': 'render'
    },

    serializeData: function() {
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      return data;
    }
  });
})