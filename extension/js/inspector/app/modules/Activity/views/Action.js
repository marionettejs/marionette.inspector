define([
  'backbone',
  'marionette',
  'util/Radio',
  'app/modules/Activity/views/ActivityTree',
  "text!templates/devTools/activity/action.html",
], function(Backbone, Marionette, Radio, ActivityTree, tpl) {

  var Action = Backbone.Marionette.View.extend({

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
      // only get the events for the first click
      this.model.eventsRoot = this.model.eventsRoot || this.model.getEvents();

      var activityTreeInstance = new ActivityTree({
        model: this.model.eventsRoot
      });

      // render ActivityTree view for the first click
      if (!this.getRegion('eventTree').hasView()) {
        this.getRegion('eventTree').show(activityTreeInstance);
      }

      this.model.isCollapsed = !this.model.isCollapsed;
      this.toggleNode();

      var actionId = this.model.get('actionId');

      Radio.request('activity', 'onClickToggle', actionId);

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

    templateContext: function() {
      return {
        collapseClass: this.chevronClass()
      };
    },

    chevronClass: function() {
      return this.model.isCollapsed ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down';
    }
  });

  return Action;
});
