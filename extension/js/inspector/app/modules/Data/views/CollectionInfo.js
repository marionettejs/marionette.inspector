define([
  'marionette',
  'util/Radio',
  'app/behaviors/SidebarPanes'
], function(Marionette, Radio, SidebarPanesBehavior) {

  return Marionette.View.extend({

    template: 'data/collection-info.html',

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    }
  });
})