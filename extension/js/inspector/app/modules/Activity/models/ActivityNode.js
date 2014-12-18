define([
  'app/components/tree/models/Node',
], function(Node) {

  var ActivityNodeCollection = Node.Collection.extend({});

  var ActivityNode = Node.extend({

    Collection: ActivityNodeCollection,

    idAttribute: 'nid',

    update: function() {
      var activityTree = this.activityCollection.buildTreePruned(this.filterCb);
      this.updateNodes(activityTree.nodes);
    }

  }, {

    build: function(activityCollection, filterCb) {
      var activityTree = activityCollection.buildTreePruned(filterCb);

      var node = new ActivityNode(activityTree, {
        level: 0
      });
      node.activityCollection = activityCollection;
      node.filterCb =  filterCb;

      return node;
    }

  });

  ActivityNodeCollection.prototype.model = ActivityNode;

  return ActivityNode;
});