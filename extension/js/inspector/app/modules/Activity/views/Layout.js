define([
  'marionette',
  "text!templates/devTools/activity/layout.html",
  "util/Radio",
  'app/modules/Activity/views/ActivityList',
  'app/modules/Activity/views/ActivityInfo',
], function(Marionette, tpl, Radio, ActivityList, ActivityInfo) {

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

    initialize: function(options) {
      Radio.connectCommands('activity', this.activityCommands, this);
    },

    onRender: function() {
      this.getRegion('activityList').show(new ActivityList({
        collection: this.options.activityCollection
      }))
    },

    showInfo: function(activityModel) {
      this.getRegion('activityInfo').show(new ActivityInfo({
        model: activityModel
      }));
    }

  });
});
