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
    },

    ui: {
      uiElement: '[data-ui-elem]',
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

    onClickPanelHeader: function(e) {
      var $target = $(e.currentTarget);
      $target.toggleClass('expanded');
      $target.next().toggleClass('visible');
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
          name: 'parentClass',
          value: data.parentClass
        };
      }

      return info;
    },

    presentAncestors: function(data, infoItems) {
      var properties = _.omit(data.properties, infoItems,
              'options', '_events', 'events', 'ui', 'modelEvents', 'collectionEvents', 'el', '$el');
      var ancestorInfo = data.ancestorInfo;

      var ancestors = [];
      _.each(ancestorInfo, function(info) {
        var props = _.pick(properties, info.keys);
        ancestors.push({
          properties: props,
          name: info.name || 'Class Properties'
        });
      });

      ancestors[0].name = "Properties";

      return ancestors;
    },

    serializeData: function() {
      var infoItems = ['cid', 'model', 'collection', 'parentClass', 'tagName', 'template'];
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.info = this.presentInfo(data, infoItems);

      // data.ancestors = this.presentAncestors(data, infoItems);
      data.properties = _.omit(data.properties, infoItems,
        'options', '_events', 'events', 'ui', 'modelEvents', 'collectionEvents', 'el', '$el');

      data.el = formatEL(data.el.value);
      data.events = this.presentEvents(this.model);
      data.ui = this.presentUI(this.model.get('ui'));
      data.option_key = "options";
      return data;
    }
  });
});
