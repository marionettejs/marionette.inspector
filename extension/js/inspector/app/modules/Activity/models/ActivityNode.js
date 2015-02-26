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

  var _filterForAction = function (treeNode, actionId) {
    return (treeNode.event && treeNode.event.get('listeners').length || treeNode.nodes.length) && (treeNode.event && treeNode.event.get('actionId') === actionId) || isAction(treeNode) && treeNode.nid === actionId;
  };

  var isAction = function(node) {
    var re = /^a\d+/;
    return typeof node.nid === 'string' && node.nid.match(re) !== null;
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
        return _filterForAction(treeNode, actionId);
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