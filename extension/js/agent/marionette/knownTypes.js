this.isKnownType = function(obj) {
  return !!this.knownType(obj);
};


this.knownTypeString = function(obj) {
  var type = this.knownType(obj);

  if (!type) {
    return ''
  }

   return type.toString(obj);
};

this.knownType = function (o) {
  if (_.isUndefined(this.patchedBackbone) || _.isUndefined(this.patchedMarionette)) {
    return;
  }

  var type = _.find(this.knownTypes(), function(knownType) {
    return (o instanceof knownType.type)
  }, this);

  if (!type) {
    return;
  }

  var type = _.clone(type);
  type.str = type.toString(o);
  type.cid = type.cid(o);

  return type;
}

this._knownTypes = {};

this.knownTypes = function() {
  var knownTypes = {};

  if (!_.isEmpty(this._knownTypes)) {
    return this._knownTypes;
  }

  if (this.patchedMarionette.VERSION && this.patchedMarionette.VERSION[0] == "2") {
    knownTypes['Marionette.LayoutView'] = {
      type: this.patchedMarionette.LayoutView,
      name: 'marionette-layout-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.LayoutView '+obj.cid+'>'}
    };
  } else {
    knownTypes['Marionette.Layout'] = {
      type: this.patchedMarionette.Layout,
      name: 'marionette-layout',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.Layout '+obj.cid+'>'}
    };
  }

  _.extend(knownTypes, {
    'Backbone.Model': {
      type: this.patchedBackbone.Model,
      name: 'backbone-model',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Backbone.Model '+obj.cid+'>'}
    },

    'Backbone.Collection': {
      type: this.patchedBackbone.Collection,
      name: 'backbone-collection',
      cid: function(obj) { return obj.__marionette_inspector__cid },
      toString: function(obj) {return '<Backbone.Collection '+obj.__marionette_inspector__cid+'>'}
    },

    'Marionette.CompositeView': {
      type: this.patchedMarionette.CompositeView,
      name: 'marionette-composite-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.CompositeView '+obj.cid+'>'}
    },

    'Marionette.CollectionView': {
      type: this.patchedMarionette.CollectionView,
      name: 'marionette-collection-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.CollectionView '+obj.cid+'>'}
    },

    'Marionette.ItemView': {
      type: this.patchedMarionette.ItemView,
      name: 'marionette-item-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.ItemView '+obj.cid+'>'}
    },

    'Marionette.View': {
      type: this.patchedMarionette.View,
      name: 'marionette-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Marionette.View '+obj.cid+'>'}
    },

    'Marionette.Application': {
      type: this.patchedMarionette.Application,
      name: 'marionette-application',
      cid: function(obj) { return undefined },
      toString: function(obj) {return '<Marionette.Application>'}
    },

    'Marionette.Module': {
      type: this.patchedMarionette.Module,
      name: 'marionette-module',
      cid: function(obj) { return obj.cid },
      toString: function() {return '<Marionette.Module>'}
    },

    'Marionette.Controller': {
      type: this.patchedMarionette.Controller,
      name: 'marionette-controller',
      cid: function(obj) { return undefined },
      toString: function(obj) {return '<Marionette.Controller>'}
    },

    'Marionette.Region': {
      type: this.patchedMarionette.Region,
      name: 'marionette-region',
      cid: function(obj) { return undefined },
      toString: function(obj) {return '<Marionette.Region>'}
    },

    'Backbone.View': {
      type: this.patchedBackbone.View,
      name: 'backbone-view',
      cid: function(obj) { return obj.cid },
      toString: function(obj) {return '<Backbone.View '+obj.cid+'>'}
    }
  });


  // Marionette Object was introduced in V2.1
  if (this.patchedMarionette.Object) {
    _.extend(knownTypes, {
      'Marionette.Object': {
        type: this.patchedMarionette.Object,
        name: 'marionette-object',
        cid: function(obj) { return undefined },
        toString: function(obj) {return '<Marionette.Object>'}
      }
    });
  }

  if (this.patchedMarionette.Behavior) {
    _.extend(knownTypes, {
      'Marionette.Behavior': {
        type: this.patchedMarionette.Behavior,
        name: 'marionette-behavior',
        cid: function(obj) { return obj.__marionette_inspector__cid },
        toString: function(obj) {return '<Marionette.Behavior ' + obj.__marionette_inspector__cid + '>'}
      }
    });
  }

  this._knownTypes = knownTypes;

  return knownTypes;
}
