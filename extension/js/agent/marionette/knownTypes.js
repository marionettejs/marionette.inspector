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

  return _.find(this.knownTypes(), function(knownType) {
    return (o instanceof knownType.type)
  }, this);
}


this.knownTypes = function() {
  var knownTypes = {};

  if (Marionette.VERSION[0] == "2") {
    knownTypes['Marionette.LayoutView'] = {
      type: this.patchedMarionette.LayoutView,
      name: 'marionette-layout-view',
      toString: function() {return '<Marionette.LayoutView>'}
    };
  } else {
    knownTypes['Marionette.Layout'] = {
      type: this.patchedMarionette.Layout,
      name: 'marionette-layout',
      toString: function() {return '<Marionette.Layout>'}
    };
  }

  _.extend(knownTypes, {
    'Backbone.Model': {
      type: this.patchedBackbone.Model,
      name: 'backbone-model',
      toString: function() {return '<Backbone.Model>'}
    },

    'Backbone.Collection': {
      type: this.patchedBackbone.Collection,
      name: 'backbone-collection',
      toString: function() {return '<Backbone.Collection>'}
    },

    'Marionette.CompositeView': {
      type: this.patchedMarionette.CompositeView,
      name: 'marionette-composite-view',
      toString: function() {return '<Marionette.CompositeView>'}
    },

    'Marionette.CollectionView': {
      type: this.patchedMarionette.CollectionView,
      name: 'marionette-collection-view',
      toString: function() {return '<Marionette.CollectionView>'}
    },

    'Marionette.ItemView': {
      type: this.patchedMarionette.ItemView,
      name: 'marionette-item-view',
      toString: function() {return '<Marionette.ItemView>'}
    },

    'Marionette.View': {
      type: this.patchedMarionette.View,
      name: 'marionette-view',
      toString: function() {return '<Marionette.View>'}
    },

    'Backbone.View': {
      type: this.patchedBackbone.View,
      name: 'backbone-view',
      toString: function() {return '<Backbone.View>'}
    }
  });


  // Marionette Object was introduced in V2.1
  if (this.patchedMarionette.Object) {
    _.extend(knownTypes, {
      'Marionette.Object': {
        type: this.patchedMarionette.Object,
        name: 'marionette-object',
        toString: function() {return '<Marionette.Object>'}
      }
    });
  }

  return knownTypes;
}
