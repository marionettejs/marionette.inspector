define([
  'marionette',
  'text!templates/devTools/activity/list.html',
  'app/modules/Activity/views/ActivityRow',
], function(Marionette, tpl, ModelRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    className: 'row',

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ModelRow,

  });

})