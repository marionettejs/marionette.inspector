define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/moreInfo.html",
  'util/presenters/formatEL'
], function(Marionette, Radio, tpl, formatEL) {

  return Marionette.ItemView.extend({
    template: tpl,

    events: {
      'click @ui.panelHeader': 'onClickPanelHeader',
      'click @ui.uiElement': 'onClickUIElement'
    },

    ui: {
      panelHeader: '.sidebar-pane-title',
      uiElement: '[data-ui-elem]'
    },

    onClickPanelHeader: function(e) {
      var $target = $(e.currentTarget);
      $target.toggleClass('expanded');
      $target.next().toggleClass('visible');
    },

    onClickUIElement: function(e) {
      var $target = $(e.currentTarget);
      var uiElement = $target.data('ui-elem');

      Radio.command('ui', 'link-to:element', {
        viewPath: this.model.get('path'),
        viewPropPath: ['ui'].concat(uiElement).join('.')
      })
    },

    presentModel: function(model) {
      var data = _.clone(model);

      if (_.isEmpty(model)) {
        return data;
      }

      data.attributes = _.map(JSON.parse(model.attributes), function(v, i) {
        return {
          name: i,
          value: v
        }
      });

      return data;
    },

    presentUI: function(ui) {
      var data = _.clone(ui);

      if (_.isEmpty(ui)) {
        return data;
      }

      data = _.map(data, function(_ui, i) {
        return {
          ui: _ui.ui,
          element: formatEL(_ui.element)
        }
      })

      return data;
    },

    presentEvents: function(events) {
      var data = _.clone(events);

      if (_.isEmpty(events)) {
        return data;
      }

      data = _.map(data, function(_event, i) {

        var handler;
        if (_event.isFunction) {
          if (_event.isNativeFunction) {
            handler = 'native function';
          } else {
            handler = 'inline function';
          }
        } else {
          handler = _event.eventHandler;
        }

        return {
          event: _event.eventName,
          handler: handler
        }
      });

      return data;
    },

    presentOptions: function(options) {
      var data = _.clone(options);

      if (_.isEmpty(options)) {
        return data;
      }

      data = _.map(data, function(_option, i) {

        var value = _option.optValue ? _option.optValue : _option.optType;

        return {
          option: _option.option,
          value: value
        }
      });

      return data;
    },

    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.model = this.presentModel(this.model.get('model'));
      data.events = this.presentEvents(this.model.get('events'));
      data.options = this.presentOptions(this.model.get('options'));

      data.ui = this.presentUI(this.model.get('ui'));
      return data;
    }
  });
});
