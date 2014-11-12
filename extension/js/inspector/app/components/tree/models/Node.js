define([
  'backbone',
], function(Backbone) {

  var Node = Backbone.Model.extend({
    initialize: function(attributes, options) {
      var nodes = this.get('nodes');
      options = options || {};
      this.level = options.level || 1;
      this.isCollapsed = false;
      if (nodes) {
        this.nodes = new NodeCollection(nodes, {level: this.level});
        this.unset('nodes');
      }
    },

    hasNodes: function() {
      return _.has(this, 'nodes') && this.nodes.length > 0;
    },

    updateNodes: function(newNodes) {
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

    idAttribute: 'name'
  });

  var NodeCollection = Backbone.Collection.extend({
    model: Node,
    initialize: function(models, options) {
      options = options || {};
      this.level = ++options.level;
    }
  });

  return Node;
});
