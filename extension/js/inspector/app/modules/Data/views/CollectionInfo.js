define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/data/collection-info.html",
  'app/behaviors/SidebarPanes'
], function(Marionette, Radio, tpl, SidebarPanesBehavior) {

  return Marionette.View.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    }
  });
})