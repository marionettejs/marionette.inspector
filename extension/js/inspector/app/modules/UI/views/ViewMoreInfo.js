define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/moreInfo.html",
  'app/behaviors/SidebarPanes',
  'util/presenters/formatEL',
  'app/behaviors/ClickableProperties',
  'util/presenters/presentListeners',
  'util/presenters/presentAncestors',
  'util/sortAttributes'
], function(
  Marionette, Radio, tpl,
  SidebarPanesBehavior, formatEL, ClickableProperties,
  presentListeners, presentAncestors, sortAttributes) {

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

    initialize: function() {
      this.activity = Radio.request('activity', 'view:activity', {
        cid: this.model.get('cid')
      });
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

      Radio.request('ui', 'highlight-element', {
        cid: this.model.get('cid'),
        path: path
      });

    },

    onMouseLeaveDomElement: function(e) {
      Radio.request('ui', 'unhighlight-element');
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
        };
      });

      return data;
    },

    presentEvents: function(viewModel) {
      var events = [];
      return events
        .concat(this._presentEvents(null, viewModel.get('events')))
        .concat(this._presentListeningTo(viewModel.get('listeningTo')))
        .concat(this._presentEvents('model', viewModel.get('modelEvents')))
        .concat(this._presentEvents('collection', viewModel.get('collectionEvents')));
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
          handler = _event.eventHandler || 'anonymous function';
        }

        var eventName = (!!this.objName) ? (this.objName + " " + _event.eventName) : _event.eventName;

        return {
          event: eventName,
          handler: handler
        };
      }, {objName: objName});

      return data;
    },

    _presentListeningTo: function(events) {
      var data = _.clone(events);

      if (_.isEmpty(events)) {
        return [];
      }

      data = _.map(data, function(_event, i) {
        return {
          event: _event.eventName,
          handler:_event.callback.key || _event.callback.inspect
        }
      });

      return data;
    },

    presentInfo: function(data, infoItems) {
      var info = _.pick(data.properties, infoItems);

      if (data._requirePath) {
        info._requirePath = {
          name: 'path',
          value: data._requirePath
        };

        info._className = {
          name: 'class',
          value: data._className
        };
      }

      if (data.parentClass) {
        info.parentClass = {
          name: 'parent class',
          value: data.parentClass
        };
      }

      var sortedInfo = sortAttributes(info);

      return sortedInfo;
    },

    presentWarnings: function() {
      var renderEvents = _.filter(this.activity, function(activity) {
        return activity.get('eventName') == 'render';
      });

      var times = _.map(renderEvents, function(e) {
        return e.get('startTime');
      });

      var timeDiffs = _.map(_.zip(times.slice(1), times.slice(0,-1)), function(t) {
        return t[0]-t[1];
      });

      var data = {};

      // calculate when more than 2 events happened in
      // less than 50 milliseconds
      data.wasAggressivelyRendered = _.some(timeDiffs, function(d) {
        return d <= 50;
      });

      // determine if a render took too long
      data.wasSlowlyRendered = false;

      data.showWarnings = data.wasAggressivelyRendered || data.wasSlowlyRendered;
      return data;
    },

    presentActivity: function() {
      return _.map(this.activity, function(event) {
        return {
          event: event.get('eventName')
        };
      });
    },

    presentModel: function () {
      var model = this.model.viewModel();
      if (!model) {
        return {};

      }

      var attributes = model.get('attributes').serialized;

      var sortedAttributes = sortAttributes(attributes);

      return sortedAttributes;
    },

    serializeData: function() {
      var infoItems = ['cid', 'model', 'collection', 'parentClass', 'tagName', 'template'];
      var instanceProperties = [
        'options', '_events', 'events', '_events',
        'ui', 'triggers', 'modelEvents', 'collectionEvents', 'el', '$el'
      ];
      var data = {};
      _.extend(data, this.serializeModel(this.model));

      data.model = this.presentModel();
      data.listeners = presentListeners(data._events);
      data.info = this.presentInfo(data, infoItems);
      data.ancestors = presentAncestors(data, infoItems, instanceProperties);
      data.el = formatEL(data.el.value);
      data.events = this.presentEvents(this.model);
      data.activity = this.presentActivity();
      data.warnings = this.presentWarnings();
      data.ui = this.presentUI(this.model.get('ui'));
      data.showUI = !_.isEmpty(this.model.get('ui'));
      data.option_key = "options";

      return data;
    }
  });
});
