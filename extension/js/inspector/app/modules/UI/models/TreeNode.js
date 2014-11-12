define([
  'app/components/tree/models/Node',
], function(Node) {

  var TreeNodeCollection = Node.Collection.extend({});

  var TreeNode = Node.extend({

    Collection: TreeNodeCollection,

    idAttribute: 'cid'
  });


  TreeNodeCollection.prototype.model = TreeNode;

  return TreeNode;
})