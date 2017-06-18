define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/activity/info.html",
  'app/behaviors/SidebarPanes',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, ClickableProperties) {

  var ActivityInfo = Marionette.View.extend({

    template: tpl,

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior
      },
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    presentDuration: function() {
      var duration = this.model.get('endTime') - this.model.get('startTime');
      return Math.round(duration*1000)/1000;
    },

    // todo replace by templateContext
    serializeData: function() {
      var data = ActivityInfo.__super__.serializeData.apply(this, arguments);
      data.duration = this.presentDuration();
      data.hasArgs = this.model.get('args') && this.model.get('args').length;

      return data;
    }
  });

  return ActivityInfo;
});
