define([
  'backbone',
  'marionette',
  'app/modules/Activity/views/Action'
], function(Backbone, Marionette, Action) {

  var ActionList = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'action-list',
    childView: Action
  });

  return ActionList;
});
