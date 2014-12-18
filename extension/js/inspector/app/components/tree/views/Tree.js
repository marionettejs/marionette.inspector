define([
  'backbone',
  'marionette',
  'text!templates/devTools/components/tree/tree.html',
], function(Backbone, Marionette, tpl) {

  window.treeCount = 0;

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
      this.ui = _.extend(Tree.prototype.ui, this.ui || {});
      this.events = _.extend(Tree.prototype.events, this.events || {});
      this.modelEvents = _.extend(Tree.prototype.modelEvents, this.modelEvents || {});
      this._onCollectionFinishAdding = _.debounce(this._onCollectionFinishAdding, 50);

      Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments);

      this.treeCount = ++window.treeCount;
      // console.log('!!! new tree', this.treeCount, this.el);
    },

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

    collapseNode: function() {
      this.model.isCollapsed = true;
      this.toggleNode();
    },

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