define([
  'app/components/tree/views/Tree',
  'util/Radio',
  "text!templates/devTools/activity/tree.html",
  'app/behaviors/ClickableProperties',
  'util/isViewType',
], function(Tree, Radio, tpl, ClickableProperties, isViewType) {

  var ActivityTree = Tree.extend({

    template: tpl,

    ui: {
      eventLink: '[data-action="show:event"]',
      contextLink: '[data-action="show:context"]'
    },

    events: {
      'click @ui.eventLink': 'onShowInfo',
      'click': 'onShowInfo'
    },

    behaviors: {
      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    onShowInfo: function (evt) {
      evt.stopPropagation();
      if (this.model.get('event')) {
        Radio.request('activity', 'show:info', this.model.get('event'));

        this.setActiveNode(this.$el);
      }
    },

    serializeEvent: function(data) {
      if (!data.event) {
        return;
      }

      var context = data.event.get('context');
      data.context = context;
      data.contextName = context.inspect;
      data.eventId = data.event.get('eventId');

      if (isViewType(context)) {
        var view = Radio.request('ui', 'view',  context.cid);
        if (!view) {
          return;
        }

        data.isView = true;
        data.isDetatched = view.isDetatched();
        data.contextName = view.getName();
      }
    },

    serializeData: function () {
      var data = ActivityTree.__super__.serializeData.apply(this, arguments);
      data.isRoot = this.model.level === 1;

      this.serializeEvent(data);

      return data;
    }
  });

  return ActivityTree;
});
