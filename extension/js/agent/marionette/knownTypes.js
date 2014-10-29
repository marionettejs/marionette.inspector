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
  if (_.isUndefined(this.windowBackbone) || _.isUndefined(this.windowMarionette)) {
    return;
  }

  return _.find(this.knownTypes(), function(knownType) {
    return (o instanceof knownType.type)
  })
}


this.knownTypes = function() {
  var knownTypes = {};

  if (Marionette.VERSION[0] == "2") {
    knownTypes['Marionette.LayoutView'] = {
      type: this.windowMarionette.LayoutView,
      name: 'marionette-layout-view',
      toString: function() {return '<Marionette.LayoutView>'}
    };
  } else {
    knownTypes['Marionette.Layout'] = {
      type: this.windowMarionette.Layout,
      name: 'marionette-layout',
      toString: function() {return '<Marionette.Layout>'}
    };
  }

  _.extend(knownTypes, {
    'Backbone.Model': {
      type: this.windowBackbone.Model,
      name: 'backbone-model',
      toString: function() {return '<Backbone.Model>'}
    },

    'Backbone.Collection': {
      type: this.windowBackbone.Collection,
      name: 'backbone-collection',
      toString: function() {return '<Backbone.Collection>'}
    },

    'Marionette.CompositeView': {
      type: this.windowMarionette.CompositeView,
      name: 'marionette-composite-view',
      toString: function() {return '<Marionette.CompositeView>'}
    },

    'Marionette.CollectionView': {
      type: this.windowMarionette.CollectionView,
      name: 'marionette-collection-view',
      toString: function() {return '<Marionette.CollectionView>'}
    },

    'Marionette.ItemView': {
      type: this.windowMarionette.ItemView,
      name: 'marionette-item-view',
      toString: function() {return '<Marionette.ItemView>'}
    },

    'Marionette.View': {
      type: this.windowMarionette.View,
      name: 'marionette-view',
      toString: function() {return '<Marionette.View>'}
    },

    'Backbone.View': {
      type: this.windowBackbone.View,
      name: 'backbone-view',
      toString: function() {return '<Backbone.View>'}
    },

    'Marionette.Object': {
      type: this.windowMarionette.Object,
      name: 'marionette-object',
      toString: function() {return '<Marionette.Object>'}
    },
  });

  return knownTypes;
}
