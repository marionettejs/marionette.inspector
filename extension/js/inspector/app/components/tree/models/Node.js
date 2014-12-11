define([
  'backbone'
], function(Backbone) {

  // Note: Always instantiate with { parse: true } to handle nested Collection.
  var Node = Backbone.Model.extend({

    idAttribute: 'name',

    defaults: {
      cid: undefined,
      name: undefined,
      path: undefined,
      idPath: undefined
    },

    level: undefined,   // Level of nesting, beginning with 0
    nodes: undefined,   // My child nodes
    isCollapsed: false, // Whether my children are hidden

    // Overridable/extendable child collection class; see end of this module
    Collection: undefined,

    initialize: function(attributes, options) {
      this.level = (options || {}).level || 1;
    },

    parse: function (data, options) {
      if (data.nodes) {
        if (!this.nodes) this.nodes = new this.Collection(null, { level: this.level });
        this.nodes.reset(data.nodes);
        data.nodes = undefined; // soft delete
      }
      return data;
    },

    hasNodes: function() {
      return _.has(this, 'nodes') && this.nodes.length > 0;
    },

    addNodes: function(newNodes) {
      if (!_.isEmpty(nodesToAdd)) {
        this.nodes.add(nodesToAdd, {level: this.level+1});
      }
    },

    updateNodes: function(newNodes) {
      if (!this.nodes) {
        this.nodes = new this.Collection(newNodes, {level: this.level});
        return;
      }

      var currentNodeIds = this.nodes.pluck(this.idAttribute);
      var newNodeIds = _.pluck(newNodes, this.idAttribute);

      var nodesToUpdate = this.nodes.filter(function(node) {
        var nodeIdsToUpdate = _.intersection(currentNodeIds, newNodeIds);
        return _.contains(nodeIdsToUpdate, node.id);
      }, this);

      var nodesToRemove = this.nodes.filter(function(node) {
        var nodeIdsToRemove = _.difference(currentNodeIds, newNodeIds);
        return _.contains(nodeIdsToRemove, node.id);
      }, this);

      var nodesToAdd = _.filter(newNodes, function(node) {
        var nodeIdsToAdd = _.difference(newNodeIds, currentNodeIds);
        return _.contains(nodeIdsToAdd, node[this.idAttribute]);
      }, this);

      if (!_.isEmpty(nodesToAdd)) {
        this.nodes.add(nodesToAdd, {level: this.level+1});
      }

      if (!_.isEmpty(nodesToRemove)) {
        this.nodes.remove(nodesToRemove);
      }

      _.each(nodesToUpdate, function(node) {
        var query = {};
        query[this.idAttribute] = node.id;
        var newNodeNodes = _.findWhere(newNodes, query);

        if (newNodeNodes.nodes) {
          node.updateNodes(newNodeNodes.nodes)
        }
      }, this);
    },

    expandPath: function(path) {
      this.trigger('expand');

      if (!_.isArray(path) || path.length == 0) {
        return;
      }

      var node = this.nodes.get(_.first(path));
      if (!node) {
        return;
      }

      node.expandPath(_.rest(path));
    },

    collapsePath: function() {
      this.trigger('collapse');

      if (!_.isArray(path) || path.length == 0) {
        return;
      }

      var node = this.nodes.get(_.first(path));
      if (!node) {
        return;
      }

      node.collapsePath(_.rest(path));

    },

    expand: function() {
      this.trigger('expand');

      if (!this.nodes) {
        return;
      }

      this.nodes.invoke('expand');
    },

    collapse: function() {
      this.trigger('collapse')
      if (!this.nodes) {
        return;
      }

      this.nodes.invoke('collapse');
    }
  });

  Node.Collection = Node.prototype.Collection = Backbone.Collection.extend({
    model: Node,
    level: undefined,
    initialize: function(models, options) {
      options = options || {};
      this.level = ++options.level;
    }
  });

  return Node;
});
