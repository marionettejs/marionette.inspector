define([
  'backbone',
  'marionette',
  'util/Radio', // ?
  'app/modules/Activity/views/ActivityTree',
  "text!templates/devTools/activity/action.html",
  'app/behaviors/ClickableProperties', // ?
  'util/isViewType', // ?
], function(Backbone, Marionette, Radio, ActivityTree, tpl, ClickableProperties, isViewType) {

  var ChildView = Backbone.Marionette.LayoutView.extend({

    template: tpl,

    regions: {
      eventTree: '[data-event-tree]'
    },

    ui: {
      toggleBtn: '[data-action="toggle"]'
    },

    events: {
      'click @ui.toggleBtn': 'onClickToggle'
    },

    onClickToggle: function() {
      this.model.eventsRoot = this.model.getEvents();

      this.getRegion('eventTree').show(new ActivityTree({
        model: this.model.eventsRoot
      }));

      this.model.isCollapsed = !this.model.isCollapsed;
      this.toggleNode();
      return false;
    },

    className: function() {
      var collapsedClass = this.model.isCollapsed ? 'is-collapsed' : 'is-expanded';
      return collapsedClass;
    },

    toggleNode: function() {
      this.$el.attr('class', this.className());
      this.$el.children('li').find('.toggle-caret').attr('class', 'toggle-caret glyphicon '+this.chevronClass());
    },

    onRender: function() {
      this.$el.attr('class', this.className());
    },

    serializeData: function() {
      var data = Backbone.Marionette.ItemView.prototype.serializeData.apply(this, this.model);
      data.collapseClass = this.chevronClass();
      return data;
    },

    chevronClass: function() {
      return this.model.isCollapsed ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
    }
  });

  var ActionList = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'action-list',
    childView: ChildView
  });

  return ActionList;
});
