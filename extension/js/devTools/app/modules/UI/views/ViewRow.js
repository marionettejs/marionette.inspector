define([
  'marionette',
  "text!templates/devTools/ui/row.html",
  'util/Radio'
], function(Marionette, tpl, Radio) {

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

      var str = "";
      str += element.tagName.toLowerCase();

      if (element.id) {
        str += "#" + element.id;
      }

      if (_.isArray(element.class)) {
        str += "." + element.class.join(".");
      }

      return str;
    }
  })

})
