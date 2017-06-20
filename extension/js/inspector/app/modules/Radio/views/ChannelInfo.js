define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/radio/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties) {

  return Marionette.View.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      },
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    }
  });
})