define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/radio/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties) {

  var hasCommandsMatcher = /^[01]\./

  return Marionette.View.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      },
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    templateContext: function() {
      var libraryVersion = Radio.request('radio', 'library:version')
      return {
        hasCommands: libraryVersion ? hasCommandsMatcher.test(libraryVersion) : true
      }
    }
  });
})