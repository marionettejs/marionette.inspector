define([
  'backbone',
  'marionette',
  'text!templates/devtools/components/tree/tree.html',
], function(Backbone, Marionette, tpl) {

  return Backbone.Marionette.CompositeView.extend({
    tagName: 'ul',

    className: function() {
      var collapsedClass = this.model.isCollapsed ? 'is-collapsed' : 'is-expanded';
      return 'tree-group ' + collapsedClass;
    },

    ui: {
      toggleBtn: '[data-action="toggle"]'
    },

    events: {
      'click @ui.toggleBtn': 'onClickToggle'
    },

    template: tpl,

    initialize: function() {
      this.collection = this.model.nodes;
    },

    onClickToggle: function() {
      this.model.isCollapsed = !this.model.isCollapsed;
      this.render();
    },

    onRender: function() {
      this.$el.attr('class', this.className());
    },

    serializeData: function() {
      var data = Backbone.Marionette.CompositeView.prototype.serializeData.apply(this, this.model);
      debugger;

      data.level = "level-"+this.model.level;
      data.collapseClass = this.model.isCollapsed ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
      data.hasNodes = this.model.hasNodes();

      return data;
    }
  });
})