define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/moreInfo.html",
  'app/behaviors/SidebarPanes',
  'util/presenters/formatEL',
  'app/behaviors/ClickableProperties'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, formatEL, ClickableProperties) {

  return Marionette.ItemView.extend({
    template: tpl,

    events: {
      'click @ui.uiElement': 'onClickUIElement',
      'click @ui.eventHandler': 'onClickEventHandler',
      'mouseover @ui.domElement': 'onMouseEnterDomElement',
      'mouseleave @ui.domElement': 'onMouseLeaveDomElement'
    },

    modelEvents: {
      'all': 'render'
    },

    className: 'sidebar-panel',

    ui: {
      domElement: '[data-dom-element]',
      eventHandler: '[data-event]',
    },

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      },

      clickableProperties: {
        behaviorClass: ClickableProperties
      }
    },

    onMouseEnterDomElement: function(e) {
      var $target = $(e.currentTarget);
      var propertyName = $target.data('property-name')
      var propertyKey = $target.data('property-key') || $target.closest('ol').data('property-key');

      if (propertyKey) {
        path = propertyKey + '.' + propertyName;
      } else {
        path = propertyName;
      }

      Radio.command('ui', 'highlight-element', {
        cid: this.model.get('cid'),
        path: path
      })
    },

    onMouseLeaveDomElement: function(e) {
      Radio.command('ui', 'unhighlight-element')
    },

    presentUI: function(ui) {
      var data = _.clone(ui);

      if (_.isEmpty(ui)) {
        return data;
      }

      data = _.map(data, function(_ui, i) {
        return {
          name: _ui.name,
          value: formatEL(_ui.value)
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

    presentInfo: function(data, infoItems) {
      var info = _.pick(data.properties, infoItems);

      if (data._requirePath) {
        info._requirePath = {
          name: 'path',
          value: data._requirePath
        }

        info._className = {
          name: 'class',
          value: data._className
        }
      }

      if (data.parentClass) {
        info.parentClass = {
          name: 'parent class',
          value: data.parentClass
        };
      }

      return info;
    },

    presentAncestors: function(data, infoItems) {
      var properties = _.omit(data.properties, infoItems,
              'options', '_events', 'events', '_events',
              'ui', 'triggers', 'modelEvents', 'collectionEvents', 'el', '$el'
      );
      var ancestorInfo = data.ancestorInfo;

      var ancestors = [];
      _.each(ancestorInfo, function(info) {
        var props = _.pick(properties, info.keys);
        ancestors.push({
          properties: props,
          name: info.name || 'Class Properties',
          path: info.path
        });
      });

      ancestors[0].name = 'Properties';

      return ancestors;
    },

    serializeData: function() {
      var infoItems = ['cid', 'model', 'collection', 'parentClass', 'tagName', 'template'];
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.info = this.presentInfo(data, infoItems);
      data.ancestors = this.presentAncestors(data, infoItems);

      var model = this.model.viewModel();
      if (model) {
        data.model = model.get('attributes').serialized;
      }


      data.el = formatEL(data.el.value);
      data.events = this.presentEvents(this.model);
      data.ui = this.presentUI(this.model.get('ui'));
      data.showUI = !_.isEmpty(this.model.get('ui'));
      data.option_key = "options";
      return data;
    }
  });
});
