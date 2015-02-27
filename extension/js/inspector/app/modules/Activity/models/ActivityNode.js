define([
  'app/components/tree/models/Node',
], function(Node) {

  var ActivityNodeCollection = Node.Collection.extend({});

  /**
   _filterTreeNode: keep nodes that:
     1. have listeners
     2. have children (if it does then it's being handled)
  */
  var _filterTreeNode = function (treeNode) {
    return treeNode.event && treeNode.event.get('listeners').length || treeNode.nodes.length;
  };

  /**
   _filterByAction: same as _filterTreeNode but also checks:
     1. if the node is the action root
     2. whether the event corresponds to the action with actionId
  */
  var _filterByAction = function (treeNode, actionId) {

    var isAction = treeNode.isAction && treeNode.nid === actionId;
    return isAction || actionEvent(treeNode, actionId, false) && _filterTreeNode(treeNode);
  };

  // TODO: function recurses all the way until no child nodes are found
  // update so that it returns as soon as actionId is found
  var actionEvent = function(treeNode, actionId, found) {
    if (treeNode.event && treeNode.event.get('actionId') === actionId) {
      found = true;
    }
    _.each(treeNode.nodes, function(node) {
      found = actionEvent(node, actionId, found);
    });
    return found;
  };

  var ActivityNode = Node.extend({

    Collection: ActivityNodeCollection,

    idAttribute: 'nid',

    update: function() {
      var activityTree = this.activityCollection.buildTreePruned(_filterTreeNode);
      this.updateNodes(activityTree.nodes);
    }
  }, {

    build: function(activityCollection) {
      var activityTree = activityCollection.buildTreePruned(_filterTreeNode);

      var node = new ActivityNode(activityTree, {
        level: 0
      });
      node.activityCollection = activityCollection;

      return node;
    },

    buildEvents: function(activityCollection, actionId) {
      var filter = function(treeNode) {
        return _filterByAction(treeNode, actionId);
      };

      var activityTree = activityCollection.buildTreePruned(filter);

      var node = new ActivityNode(activityTree, {
        level: 0
      });
      node.activityCollection = activityCollection;

      return node;
    }

  });

  ActivityNodeCollection.prototype.model = ActivityNode;

  return ActivityNode;
});
