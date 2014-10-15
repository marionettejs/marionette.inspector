define([
  'marionette',
  "text!templates/devTools/ui/list.html",
  'app/modules/UI/views/ViewRow'
], function(Marionette, tpl, ViewRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    childViewContainer: '[data-child-view-container]',

    childView: ViewRow,
  });
})
