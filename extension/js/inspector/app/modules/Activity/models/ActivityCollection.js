define([
  'backbone',
  'logger',
  'app/modules/Activity/models/ActivityModel'
], function(Backbone, logger, ActivityModel) {

  var ActivityCollection = Backbone.Collection.extend({

    model: ActivityModel,

    // This algorithm reverse-engineers a tree from a pre-order traversal of an n-ary tree.
    // By retaining a "back references", the algorithm can determine how the pre-order traversal
    // path shifted on each iteration and append the current node to the tree.
    buildTree: function () {
      var root = {
        nid: 'root',
        nidPath: [],
        name: 'root',
        event: null,
        nodes: []
      };
      var path = [root];
      var prevDepth = 0;
      var prevActionId = null;
      var prevNode;

      this.each(function (event) {
        var actionId = event.get('actionId');
        var eventId = event.get('eventId');
        var depth = event.get('depth');
        var name = event.get('eventName');
        var actionNode;
        var parentNode;
        var newNode;
        var nidPath;
        var missingAncestorCount;

        // If Activity ID has incremented, create a root child node and push onto path.
        if (actionId !== prevActionId) {
          actionNode = {
            nid: actionId,
            nidPath: ['root'],
            name: 'Action ' + actionId.substring(1),
            event: null,
            nodes: []
          };
          root.nodes.push(actionNode);
          prevDepth = 0;
          prevNode = actionNode;
        }

        if (depth > prevDepth) {
          // Depth has advanced; add previous node to the path.
          path.push(prevNode);

          // Handle case of missing ancestors.
          // Bad data. Hopefully we can sanitize data earlier or fix at the source, but it should
          // not break this algorithm.
          if (depth > prevDepth + 1) {
            missingAncestorCount = depth - prevDepth - 1;
            logger.warn('activity', 'Adding ' + missingAncestorCount +
                ' missing ancestor node(s) for name=' + name + ' nid=' + eventId);
            _.times(missingAncestorCount, this._addMissingParents.bind(this, path));
          }
        } else if (depth < prevDepth) {
          // Depth has regressed; pop the path appropriately.
          _.times(prevDepth - depth, path.pop, path);
        }

        // Parent node is the final node on the path.
        parentNode = _.last(path);

        // The node representing the current event object
        // TODO: Modify this to be compatible with Node#updateNodes
        newNode = {
          nid: eventId,
          nidPath: parentNode.nidPath.concat(parentNode.nid),
          name: name,
          event: event,
          nodes: []
        };

        // Add new node to parent's children
        parentNode.nodes.push(newNode);

        // Set back references for next iteration
        prevDepth = depth;
        prevNode = newNode;
        prevActionId = actionId;
      }, this);

      return root;
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

    // Note: This updates the `path` {array} argument in-place.
    _addMissingParents: function (path) {
      var parentNode = _.last(path);
      var missingParent = {
        nid: _.uniqueId('missing-parent-'),
        nidPath: parentNode.nidPath.concat(parentNode.nid),
        name: null,
        event: null,
        nodes: []
      };
      parentNode.nodes.push(missingParent);
      path.push(missingParent);
      return path;
    }
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
