define([
  'backbone',
  'logger',
  'app/modules/Activity/models/ActivityModel',
  'app/modules/Activity/models/ActivityTree'
], function(Backbone, logger, ActivityModel, ActivityTree) {

  var ActivityCollection = Backbone.Collection.extend({

    model: ActivityModel,

    findByEventId: function(eventId) {
      return this.find(function(activity) {
        return activity.get('eventId') === eventId;
      });
    },

    filterByContextCid: function(cid) {
      return this.filter(function(activity) {
        return activity.get('context').cid == cid;
      });
    },

    filterByActionId: function(actionId) {
      return this.filter(function(activity) {
        return activity.get('actionId') === actionId;
      });
    },

    buildTree: function() {
      var tree = new ActivityTree(this);
      return tree.buildTree();
    },

    // Build entire tree and then prune using a depth-first (preorder) traversal. This allows for
    // leaves to be cleaned up first, then parents. The root will never be pruned.
    // arg filter {function}
    //   arg node {object}
    //     nid
    //     nidPath
    //     name
    //     event
    //     nodes
    //   return truthy if node should remain in the tree
    buildTreePruned: function (filter) {
      var tree = this.buildTree();
      ActivityCollection.pruneTree(tree, filter);

      return tree;
    },

  }, {

    // Prune a tree in-place using a depth-first (preorder) traversal. This allows for leaves to
    // be cleaned up first, then parents. The root will never be pruned.
    // arg tree {object} Tree node
    //   nid
    //   nidPath
    //   name
    //   event
    //   nodes
    // arg filter {function}
    //   arg node {object} Tree node
    //   return truthy if node should remain in the tree
    pruneTree: function (tree, filter) {
      // Prune my children
      _.each(tree.nodes, function (node, idx, nodes) {
        // Visit child first (depth-first)
        ActivityCollection.pruneTree(node, filter);
        if (!filter(node)) {
          // Use soft delete to avoid corrupting iterator
          nodes[idx] = undefined;
        }
      });

      // Prevent sparse arrays (this may not be necessary)
      tree.nodes = _.compact(tree.nodes);
    }
  });

  return ActivityCollection;
});
