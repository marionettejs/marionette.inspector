define([
  'marionette',
  "text!templates/devTools/activity/layout.html",
  "util/Radio",
  'app/modules/Activity/views/ActivityTree',
  'app/modules/Activity/views/ActivityList',
  'app/modules/Activity/views/ActivityInfo',
], function(Marionette, tpl, Radio, ActivityTree, ActivityList, ActivityInfo) {

  return Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      activityList: '[data-region="activity-list"]',
      activityInfo: '[data-region="activity-info"]',
    },

    attributes: {
      view: 'activity-layout'
    },

    activityCommands: {
      'show:info': 'showInfo'
    },

    className: 'app-tool',

    activities: undefined,
    treeModel: undefined,

    initialize: function(options) {
      this.activities = options.activities;
      Radio.connectCommands('activity', this.activityCommands, this);
      this.bindEntityEvents(this.activities, this.activitiesEvents);
    },

    onRender: function() {
      this.getRegion('activityList').show(new ActivityList({
        collection: this.activities
      }));
    },

    showInfo: function(activityModel) {
      this.getRegion('activityInfo').show(new ActivityInfo({
        model: activityModel
      }));
    }
  });
});
