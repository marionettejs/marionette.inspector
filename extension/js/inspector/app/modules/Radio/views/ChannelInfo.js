define([
  'marionette',
  'util/Radio',
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, SidebarPanesBehavior, ClickableProperties) {

  var hasCommandsMatcher = /^[01]\./

  return Marionette.View.extend({

    template: 'radio/info.html',

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