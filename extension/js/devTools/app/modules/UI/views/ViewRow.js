define([
  'marionette',
  "text!templates/devTools/ui/row.html",
  'util/Radio',
  'util/presenters/formatEL'
], function(Marionette, tpl, Radio, formatEL) {

  return Marionette.ItemView.extend({
    template: tpl,

    tagName: 'tr',

    ui: {
      moreInfoLink: "[data-action='more-info']",
      inspectElementLink: "[data-action='inspect-element']",
      logViewLink: "[data-action='log-view']"
    },

    events: {
      "click @ui.moreInfoLink": "onClickMoreInfo",
      "click @ui.inspectElementLink": 'onClickInspectElement',
      "click @ui.logViewLink": 'onClickLogViewLink'
    },


    onClickMoreInfo: function() {
      Radio.command('ui', 'show:more-info', this.model);
    },

    onClickInspectElement: function() {
      Radio.command('ui', 'link-to:element', this.model.get('path'))
    },

    onClickLogViewLink: function() {
      Radio.command('ui', 'log', {
        viewPath: this.model.get('path'),
        message: 'view'
      })
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.formattedElement = this.presentElement(this.model.get('element'));
      return data;
    },

    presentElement: function(element) {

      if (_.isEmpty(element)) {
        return "";
      }

      return formatEL(element);
    }


  })

})
