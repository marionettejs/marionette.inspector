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
  }

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
    }

  });

  ActivityNodeCollection.prototype.model = ActivityNode;

  return ActivityNode;
});