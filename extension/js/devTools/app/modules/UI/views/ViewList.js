define([
  'marionette',
  'jquery',
  "text!templates/devTools/ui/list.html",
  'app/modules/UI/views/ViewRow'
], function(Marionette, $, tpl, ViewRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    tagName: 'table',

    className: 'table tree',

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ViewRow,

    onDomRefresh: function() {
      $('.tree').treegrid({
        expanderExpandedClass: 'glyphicon glyphicon-chevron-down',
        expanderCollapsedClass: 'glyphicon glyphicon-chevron-up'
      });
    }
  });
})
