;(function(Agent){

  var toString = function(obj) {
    var name = obj._className ? obj._className : this.className;
    var cid = _.isFunction(this.cid) ? this.cid(obj) : this.cid;
    return '<' + name + ' ' + cid + '>';
  }

  Agent.isKnownType = function(obj) {
    return !!Agent.knownType(obj);
  };

  Agent.knownTypeString = function(obj) {
    var type = Agent.knownType(obj);

    if (!type) {
      return ''
    }

     return type.toString(obj);
  };

  Agent.knownType = function (o) {
    if (_.isUndefined(Agent.patchedBackbone) || _.isUndefined(Agent.patchedMarionette)) {
      return;
    }

    var type = _.find(Agent.knownTypes(), function(knownType) {
      return (o instanceof knownType.type)
    }, Agent);

    if (!type) {
      return;
    }

    var type = _.clone(type);
    type.str = type.toString(o);
    type.cid = type.cid(o);

    return type;
  };

  Agent._knownTypes = {};

  Agent.knownTypes = function() {
    var knownTypes = {};

    if (!_.isEmpty(Agent._knownTypes)) {
      return Agent._knownTypes;
    }

    if (Agent.patchedMarionette.VERSION && Agent.patchedMarionette.VERSION[0] == "2") {
      knownTypes['Marionette.LayoutView'] = {
        type: Agent.patchedMarionette.LayoutView,
        name: 'marionette-layout-view',
        className: 'Marionette.LayoutView',
        cid: function(obj) { return obj.cid },
        toString: toString
      };
    } else {
      knownTypes['Marionette.Layout'] = {
        type: Agent.patchedMarionette.Layout,
        name: 'marionette-layout',
        className: 'Marionette.Layout',
        cid: function(obj) { return obj.cid },
        toString: toString
      };
    }

    _.extend(knownTypes, {
      'Backbone.Model': {
        type: Agent.patchedBackbone.Model,
        name: 'backbone-model',
        className: 'Backbone.Model',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Backbone.Collection': {
        type: Agent.patchedBackbone.Collection,
        name: 'backbone-collection',
        className: 'Backbone.Collection',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.CompositeView': {
        type: Agent.patchedMarionette.CompositeView,
        name: 'marionette-composite-view',
        className: 'Marionette.CompositeView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.CollectionView': {
        type: Agent.patchedMarionette.CollectionView,
        name: 'marionette-collection-view',
        className: 'Marionette.CollectionView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.ItemView': {
        type: Agent.patchedMarionette.ItemView,
        name: 'marionette-item-view',
        className: 'Marionette.ItemView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.View': {
        type: Agent.patchedMarionette.View,
        name: 'marionette-view',
        className: 'Marionette.View',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.Application': {
        type: Agent.patchedMarionette.Application,
        name: 'marionette-application',
        className: 'Marionette.Application',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.Module': {
        type: Agent.patchedMarionette.Module,
        name: 'marionette-module',
        className: 'Marionette.Module',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: function() {return '<Marionette.Module>'}
      },

      'Marionette.Controller': {
        type: Agent.patchedMarionette.Controller,
        name: 'marionette-controller',
        className: 'Marionette.Controller',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.Region': {
        type: Agent.patchedMarionette.Region,
        name: 'marionette-region',
        className: 'Marionette.Region',
        cid: function(obj) { return '' },
        toString: toString
      },

      'Backbone.View': {
        type: Agent.patchedBackbone.View,
        name: 'backbone-view',
        className: 'Backbone.View',
        cid: function(obj) { return obj.cid },
        toString: toString
      }
    });


    // Marionette Object was introduced in V2.1
    if (Agent.patchedMarionette.Object) {
      _.extend(knownTypes, {
        'Marionette.Object': {
          type: Agent.patchedMarionette.Object,
          name: 'marionette-object',
          className: 'Marionette.Object',
          cid: function(obj) { return obj.__marionette_inspector__cid },
          toString: toString
        }
      });
    }

    if (Agent.patchedMarionette.Behavior) {
      _.extend(knownTypes, {
        'Marionette.Behavior': {
          type: Agent.patchedMarionette.Behavior,
          name: 'marionette-behavior',
          className: 'Marionette.Behavior',
          cid: function(obj) { return obj.__marionette_inspector__cid },
          toString: toString
        }
      });
    }


    if (Agent.patchedBackbone.Wreqr) {
      _.extend(knownTypes, {
        'Backbone.Wreqr.Channel': {
          type: Agent.patchedBackbone.Wreqr.Channel,
          name: 'wreqr-channel',
          className: 'Wreqr.Channel',
          cid: function(obj) { return ''},
          toString: toString
        }
      });
    }


    if (Agent.patchedBackbone.Radio) {
      _.extend(knownTypes, {
        'Backbone.Radio.Channel': {
          type: Agent.patchedBackbone.Radio.Channel,
          name: 'radio-channel',
          className: 'Radio.Channel',
          cid: function(obj) { return '' },
          toString: toString
        }
      });
    }

    Agent._knownTypes = knownTypes;

    return knownTypes;
  };

}(this));
