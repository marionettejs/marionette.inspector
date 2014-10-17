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
      moreInfoLink: "[data-action='more-info']"
    },

    events: {
      "click @ui.moreInfoLink": "onClickMoreInfo"
    },


    onClickMoreInfo: function() {
      Radio.command('ui', 'show:more-info', this.model);
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
