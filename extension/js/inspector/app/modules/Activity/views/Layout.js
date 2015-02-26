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

    activityCollectionEvents: {
      'add remove reset': 'onChangeActivityCollection'
    },

    className: 'app-tool activity',

    activityCollection: undefined,
    activityRoot: undefined,

    initialize: function(options) {
      options = options || {};
      this.activityCollection = options.activityCollection;
      window.actionCollection = this.actionCollection = options.actionCollection;
      this.actionCollection.activityCollection = options.activityCollection;

      this.bindEntityEvents(this.activityCollection, this.activityCollectionEvents);
      Radio.connectCommands('activity', this.activityCommands, this);
    },

    onChangeActivityCollection: _.debounce(function () {
      // console.log('*** activity tree change called');
      this.activityRoot.update();
    }, 2000),

    onBeforeRender: function() {
    },

    onBeforeShow: function() {
      window.activityRoot = this.activityRoot = ActivityNode.build(this.activityCollection, this._filterTreeNode);

      this.activityRoot.collapse();
      this.activityRoot.expandPath('root');

      this.getRegion('activityList').show(new ActivityTree({
        model: this.activityRoot
      }));

      // this.getRegion('activityList').show(new ActionList({
      //   collection: this.actionCollection
      // }));
    },

    showInfo: function(activityModel) {
      this.getRegion('activityInfo').show(new ActivityInfo({
        model: activityModel
      }));
    },
  });
});
