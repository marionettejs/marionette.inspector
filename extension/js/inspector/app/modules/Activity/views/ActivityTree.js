define([
  'app/components/tree/views/Tree',
  'util/Radio',
  'app/behaviors/ClickableProperties',
  'util/isViewType',
], function(Tree, Radio, ClickableProperties, isViewType) {

  var ActivityTree = Tree.extend({

    template: 'activity/tree.html',

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

    childView: function () {
      return ActivityTree
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

    templateContext: function () {
      var data = Tree.prototype.templateContext.apply(this, arguments);
      Object.assign(data, {
        isRoot: this.model.level === 1
      });
      this.serializeEvent(data);
      return data;
    }
  });

  return ActivityTree;
});
