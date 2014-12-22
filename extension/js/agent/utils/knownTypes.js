;(function(agent){

  var toString = function(obj) {
    var name = obj._className ? obj._className : this.className;
    var cid = _.isFunction(this.cid) ? this.cid(obj) : this.cid;
    return '<' + name + ' ' + cid +'>'
  }

  agent.isKnownType = function(obj) {
    return !!agent.knownType(obj);
  };


  agent.knownTypeString = function(obj) {
    var type = agent.knownType(obj);

    if (!type) {
      return ''
    }

     return type.toString(obj);
  };

  agent.knownType = function (o) {
    if (_.isUndefined(agent.patchedBackbone) || _.isUndefined(agent.patchedMarionette)) {
      return;
    }

    var type = _.find(agent.knownTypes(), function(knownType) {
      return (o instanceof knownType.type)
    }, agent);

    if (!type) {
      return;
    }

    var type = _.clone(type);
    type.str = type.toString(o);
    type.cid = type.cid(o);

    return type;
  }

  agent._knownTypes = {};

  agent.knownTypes = function() {
    var knownTypes = {};

    if (!_.isEmpty(agent._knownTypes)) {
      return agent._knownTypes;
    }

    if (agent.patchedMarionette.VERSION && agent.patchedMarionette.VERSION[0] == "2") {
      knownTypes['Marionette.LayoutView'] = {
        type: agent.patchedMarionette.LayoutView,
        name: 'marionette-layout-view',
        className: 'Marionette.LayoutView',
        cid: function(obj) { return obj.cid },
        toString: toString
      };
    } else {
      knownTypes['Marionette.Layout'] = {
        type: agent.patchedMarionette.Layout,
        name: 'marionette-layout',
        className: 'Marionette.Layout',
        cid: function(obj) { return obj.cid },
        toString: toString
      };
    }

    _.extend(knownTypes, {
      'Backbone.Model': {
        type: agent.patchedBackbone.Model,
        name: 'backbone-model',
        className: 'Backbone.Model',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Backbone.Collection': {
        type: agent.patchedBackbone.Collection,
        name: 'backbone-collection',
        className: 'Backbone.Collection',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.CompositeView': {
        type: agent.patchedMarionette.CompositeView,
        name: 'marionette-composite-view',
        className: 'Marionette.CompositeView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.CollectionView': {
        type: agent.patchedMarionette.CollectionView,
        name: 'marionette-collection-view',
        className: 'Marionette.CollectionView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.ItemView': {
        type: agent.patchedMarionette.ItemView,
        name: 'marionette-item-view',
        className: 'Marionette.ItemView',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.View': {
        type: agent.patchedMarionette.View,
        name: 'marionette-view',
        className: 'Marionette.View',
        cid: function(obj) { return obj.cid },
        toString: toString
      },

      'Marionette.Application': {
        type: agent.patchedMarionette.Application,
        name: 'marionette-application',
        className: 'Marionette.Application',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.Module': {
        type: agent.patchedMarionette.Module,
        name: 'marionette-module',
        className: 'Marionette.Module',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: function() {return '<Marionette.Module>'}
      },

      'Marionette.Controller': {
        type: agent.patchedMarionette.Controller,
        name: 'marionette-controller',
        className: 'Marionette.Controller',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: toString
      },

      'Marionette.Region': {
        type: agent.patchedMarionette.Region,
        name: 'marionette-region',
        className: 'Marionette.Region',
        cid: function(obj) { return '' },
        toString: toString
      },

      'Backbone.View': {
        type: agent.patchedBackbone.View,
        name: 'backbone-view',
        className: 'Backbone.View',
        cid: function(obj) { return obj.cid },
        toString: toString
      }
    });


    // Marionette Object was introduced in V2.1
    if (agent.patchedMarionette.Object) {
      _.extend(knownTypes, {
        'Marionette.Object': {
          type: agent.patchedMarionette.Object,
          name: 'marionette-object',
          className: 'Marionette.Object',
          cid: function(obj) { return obj.__marionette_inspector__cid },
          toString: toString
        }
      });
    }

    if (agent.patchedMarionette.Behavior) {
      _.extend(knownTypes, {
        'Marionette.Behavior': {
          type: agent.patchedMarionette.Behavior,
          name: 'marionette-behavior',
          className: 'Marionette.Behavior',
          cid: function(obj) { return obj.__marionette_inspector__cid },
          toString: toString
        }
      });
    }

    agent._knownTypes = knownTypes;

    return knownTypes;
  }
}(this))

