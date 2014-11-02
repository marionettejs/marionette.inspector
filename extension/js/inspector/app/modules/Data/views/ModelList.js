define([
  'marionette',
  'text!templates/devTools/data/list.html',
  'app/modules/Data/views/ModelRow',
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