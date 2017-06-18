define([
  'backbone',
  'marionette',
  'text!templates/devTools/components/tree/tree.html',
], function(Backbone, Marionette, tpl) {

  window.treeCount = 0;


  /**
  TODO: seriously consider using fancyTree https://github.com/mar10/fancytree
  why? because it seems to do lazy rendering well and we could potentially be showng a big tree.
  */
  var Tree = Backbone.Marionette.CompositeView.extend({
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

    modelEvents: {
      'expand': 'expandNode',
      'collapse': 'collapseNode'
    },

    template: tpl,

    constructor: function(options) {
      this.collection = options.model.nodes;

      // extend basic class properties so that they're sub-class friendly
      this.ui = _.extend({}, Tree.prototype.ui, this.ui || {});
      this.events = _.extend({}, Tree.prototype.events, this.events || {});
      this.modelEvents = _.extend({}, Tree.prototype.modelEvents, this.modelEvents || {});

      Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);

      this.treeCount = ++window.treeCount;
      // console.log('!!! new tree', this.treeCount, this.el);
    },

    onClickToggle: function() {
      this.model.isCollapsed = !this.model.isCollapsed;
      this.toggleNode();
      return false;
    },

    // Sets a single element with the active class
    // passed, while unsetting all matching child nodes
    // with the same class.
    setActiveNode: function($el, klass) {
      klass = klass || 'node-active';

      $('.'+klass, this.getRootNode()).removeClass(klass);
      $el.children('li').addClass(klass);
    },

    expandNode: function() {
      this.toggleNode();
    },

    // Helper method to get the root
    // node of a tree, based on the current model index.
    getRootNode: function() {
      var currentIndex = this.model.index;
      return this.$el.parents()[currentIndex - 1];
    },

    collapseNode: function() {
      this.toggleNode();
    },

    /**
     toggle the tree from expanded to collapsed
       1. update class names primarily for is-expanded / is-collapsed
       2. update the span toggle-caret for chevron-up chevron-down
     */
    toggleNode: function() {
      this.$el.attr('class', this.className());
      this.$el.children('li').find('.toggle-caret').attr('class', 'toggle-caret glyphicon '+this.chevronClass());
    },

    onRender: function() {
      // console.log('!!! render tree', this.treeCount);
      this.$el.attr('class', this.className());
    },

    serializeData: function() {
      var data = Backbone.Marionette.CompositeView.prototype.serializeData.apply(this, this.model);
      data.level = "level-"+this.model.level;
      data.collapseClass = this.chevronClass();
      data.hasNodes = this.model.hasNodes();
      data.leafClass = this.model.hasNodes() ? 'is-parent' : 'is-leaf';

      return data;
    },

    chevronClass: function() {
      return this.model.isCollapsed ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down'
    }
  });

  return Tree;
})
