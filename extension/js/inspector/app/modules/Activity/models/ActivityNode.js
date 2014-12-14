define([
  'app/components/tree/models/Node',
], function(Node) {

  var ActivityNodeCollection = Node.Collection.extend({});

  var ActivityNode = Node.extend({

    Collection: ActivityNodeCollection,
    idAttribute: 'nid'
  });


  ActivityNodeCollection.prototype.model = ActivityNode;

  return ActivityNode;
});
