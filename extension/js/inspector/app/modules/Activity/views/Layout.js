define([
  'marionette',
  "text!templates/devTools/activity/layout.html",
  "util/Radio",
  'app/modules/Activity/models/ActivityNode',
  'app/modules/Activity/views/ActivityTree',
  'app/modules/Activity/views/ActionList',
  'app/modules/Activity/views/ActivityInfo',
], function(Marionette, tpl, Radio, ActivityNode, ActivityTree, ActionList, ActivityInfo) {

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

    className: 'app-tool activity',

    activityCollection: undefined,
    activityRoot: undefined,

    initialize: function(options) {
      options = options || {};
      this.activityCollection = options.activityCollection;
      this.actionCollection = options.actionCollection;
      this.actionCollection.activityCollection = options.activityCollection;

      Radio.connectCommands('activity', this.activityCommands, this);
    },

    onBeforeRender: function() {
    },

    onBeforeShow: function() {
      this.actionCollection.resetCollapse();
      this.getRegion('activityList').show(new ActionList({
        collection: this.actionCollection
      }));
    },

    showInfo: function(activityModel) {
      this.getRegion('activityInfo').show(new ActivityInfo({
        model: activityModel
      }));
    },
  });
});
