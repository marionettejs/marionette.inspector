define([
  'marionette'
], function(Marionette) {
  return Marionette.Behavior.extend({

    ui: {
      panelHeader: '.sidebar-pane-title'
    },

    events: {
      'click @ui.panelHeader': 'onClickPanelHeader',
    },

    onClickPanelHeader: function(e) {
      var $target = $(e.currentTarget);
      $target.toggleClass('expanded');
      $target.next().toggleClass('visible');
    },
  });
})