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
      });

      return root;
    }
  });
});
