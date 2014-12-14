define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/activity/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties) {

  var ActivityInfo = Marionette.ItemView.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior
      },
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    serializeData: function() {
      var data = ActivityInfo.__super__.serializeData.apply(this, arguments);
      data.duration = this.model.get('endTime') - this.model.get('startTime');
      data.hasArgs = this.model.get('args') && this.model.get('args').length;
      return data;
    }
  });

  return ActivityInfo;
});
