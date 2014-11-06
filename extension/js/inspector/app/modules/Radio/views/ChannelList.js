define([
  'marionette',
  'text!templates/devTools/radio/list.html',
  'app/modules/Radio/views/ChannelRow',
], function(Marionette, tpl, ChannelRow) {

  return Marionette.CompositeView.extend({
    template: tpl,

    className: 'row',

    childViewContainer: '[data-child-view-container]',

    attributes: {
      view: 'list'
    },

    childView: ChannelRow,

  });

})