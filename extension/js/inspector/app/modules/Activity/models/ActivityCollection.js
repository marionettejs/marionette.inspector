define([
  'backbone',
  'app/modules/Activity/models/ActivityModel'
], function(Backbone, ActivityModel) {

  return Backbone.Collection.extend({

    model: ActivityModel,

    // This algorithm reverse-engineers a tree from a pre-order traversal of an n-ary tree.
    // By retaining a "back references", the algorithm can determine how the pre-order traversal
    // path shifted on each iteration and append the current node to the tree.
    buildTree: function () {
      var root = {
        nid: 'root',
        nodes: []
      };
      var path = [];
      var prevDepth = 0;
      var prevActionId = null;
      var prevNode;

      _.each(events, function (event) {
        var actionId = this.get('actionId');
        var eventId = this.get('eventId');
        var depth = this.get('depth');
        var actionNode;
        var parentNode;
        var newNode;

        // If Activity ID has incremented, create a root child node and push onto path.
        if (actionId !== prevActionId) {
          actionNode = {
            nid: actionId,
            nodes: []
          };
          root.nodes.push(actionNode);
          prevDepth = 0;
          prevNode = actionNode;
        }

        if (depth > prevDepth) {
          // Depth has advanced; add previous node to the path.
          path.push(prevNode);
        } else if (depth < prevDepth) {
          // Depth has regressed; pop the path appropriately.
          _.times(prevDepth - depth, path.pop, path);
        }

        // The node representing the current event object
        // TODO: Modify this to be compatible with Node#updateNodes
        newNode = {
          nid: eventId,
          nodes: []
        };

        // Parent node is the final node on the path.
        parentNode = _.last(path);
        parentNode.nodes.push(newNode);

        prevDepth = depth;
        prevNode = newNode;
        prevActionId = actionId;
      });

      return root;
    }
  });
});
