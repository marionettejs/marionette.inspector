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

      this._onCollectionFinishAdding = _.debounce(this._onCollectionFinishAdding, 50);

      Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);

      this.treeCount = ++window.treeCount;
      // console.log('!!! new tree', this.treeCount, this.el);
    },

    /**
     We're overriding CollectionView._onCollectionAdd here so that we can
     do something pretty tricky:

      It turns out that when a collection receives an add w/ a large array e.g. `cv.add([{},{},{}])`
      Each add will update the dom. We change that default behavior, by starting a
      buffer session and finishing after no more add's happen after a certain threshold.

      This fix/hack saved chrome it twas that bad.
     */
    _onCollectionAdd: function() {
      if (!this.isAdding) {
        this.isAdding = true;
        this.startBuffering();
        this._onCollectionFinishAdding();
      }

      // console.log('adding collection item', this.cid, this.isBuffering);
      Marionette.CollectionView.prototype._onCollectionAdd.apply(this, arguments);
    },

    _onCollectionFinishAdding: function() {
      if (!this.isAdding) {
        return;
      }

      // console.log('finished adding collection', this.cid);
      this.isAdding = false;
      this.endBuffering();
    },

    onClickToggle: function() {
      this.model.isCollapsed = !this.model.isCollapsed;
      this.toggleNode();
      return false;
    },

    expandNode: function() {
      this.model.isCollapsed = false;
      this.toggleNode();
    },

    // Helper method to get the root
    // node of a tree, based on the current model index.
    getRootNode: function() {
      var currentIndex = this.model.index;
      return this.$el.parents()[currentIndex - 1];
    },

    collapseNode: function() {
      this.model.isCollapsed = true;
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