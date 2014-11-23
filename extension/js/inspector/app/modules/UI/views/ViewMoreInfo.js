define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/moreInfo.html",
  'app/behaviors/SidebarPanes',
  'util/presenters/formatEL'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, formatEL) {

  return Marionette.ItemView.extend({
    template: tpl,

    events: {
      'click @ui.uiElement': 'onClickUIElement',
      'click @ui.eventHandler': 'onClickEventHandler',
      'click @ui.property': 'onClickProperty'
    },

    ui: {
      uiElement: '[data-ui-elem]',
      eventHandler: '[data-event]',
      property: '[data-property-name]'
    },

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    },

    onClickProperty: function(e) {
      e.stopPropagation();

      var $target = $(e.currentTarget);
      var propertyKey = $target.data('property-key');
      var propertyName = $target.data('property-name');

      var property = this.model.get(propertyKey);
      if (!property) {
        return
      }

      var object = property[propertyName]
      if (object.type && object.cid) {
        Radio.command('app', 'navigate:knownObject', {
          object: object
        })
      }
    },

    onClickPanelHeader: function(e) {
      var $target = $(e.currentTarget);
      $target.toggleClass('expanded');
      $target.next().toggleClass('visible');
    },

    onClickUIElement: function(e) {
      var $target = $(e.currentTarget);
      var uiElement = $target.data('ui-elem');

      Radio.command('ui', 'inspect:view-element', {
        viewPath: this.options.path,
        viewPropPath: ['ui'].concat(uiElement).join('.')
      })
    },

    onClickEventHandler: function(e) {
      var $target = $(e.currentTarget);
      var eventHandler = $target.data('event');

      Radio.command('ui', 'inspect:view-function', {
        viewPath: this.options.path,
        viewPropPath: eventHandler
      })
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

    presentEvents: function(viewModel) {
      var events = [];
      return events
        .concat(this._presentEvents(null, viewModel.get('events')))
        .concat(this._presentEvents('model', viewModel.get('modelEvents')))
        .concat(this._presentEvents('collection', viewModel.get('collectionEvents')))
    },

    _presentEvents: function(objName, events) {
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

        var eventName = (!!this.objName) ? (this.objName + " " + _event.eventName) : _event.eventName;

        return {
          event: eventName,
          handler: handler
        }
      }, {objName: objName});

      return data;
    },

    serializeData: function() {
      var infoItems = ['cid', 'model', 'collection', 'parentClass'];
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.info = _.pick(data.properties, infoItems);
      if (data._requirePath) {
        data.info._requirePath = {
          name: 'path',
          value: data._requirePath
        }

        data.info._className = {
          name: 'class',
          value: data._className
        }
      }

      if (data.parentClass) {
        data.info.parentClass = {
          name: 'parentClass',
          value: data.parentClass
        };
      }

      data.properties = _.omit(data.properties, infoItems,
        'options', '_events', 'events', 'ui', 'modelEvents', 'collectionEvents', 'el', '$el');

      data.element = formatEL(data.element);
      data.events = this.presentEvents(this.model);
      data.ui = this.presentUI(this.model.get('ui'));
      return data;
    }
  });
});
