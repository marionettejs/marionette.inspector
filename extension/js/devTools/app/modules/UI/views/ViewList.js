define([
  'marionette',
  'jquery',
  "text!templates/devTools/ui/list.html",
  'app/modules/UI/views/ViewRow'
], function(Marionette, $, tpl, ViewRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    childViewContainer: '[data-child-view-container]',

    childView: ViewRow,

    onDomRefresh: function() {
      $('.tree').treegrid({
        expanderExpandedClass: 'glyphicon glyphicon-chevron-down',
        expanderCollapsedClass: 'glyphicon glyphicon-chevron-up'
      });
    }
  });
})
