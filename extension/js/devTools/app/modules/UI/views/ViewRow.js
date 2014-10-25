define([
  'marionette',
  "text!templates/devTools/ui/row.html",
  'util/Radio',
  'util/presenters/formatEL'
], function(Marionette, tpl, Radio, formatEL) {

  return Marionette.ItemView.extend({
    template: tpl,

    tagName: 'tr',

    className: function() {
      var path = this.model.get('path')
      var pathList = path.split('.');


      var name = "treegrid-" + pathList.join('-');
      var parentPath = _.head(pathList, pathList.length-1).join('-');
      var parentName = parentPath ? "treegrid-parent-" + parentPath : '';

      //treegrid-8 treegrid-parent-7
      return name + " " + parentName;
    },

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
      Radio.command('ui', 'inspect:view-element', {
        viewPath: this.model.get('path'),
        viewPropPath: 'el'
      })
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
      data.viewName = _.last(data.path.split('.'));
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
