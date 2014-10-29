
var AppObserver = function() {
};

_.extend(AppObserver.prototype, {

  _: window._,

  // expression that's eval'd on the window to get the app
  appExpression: "__agent.mainMarionetteApp",

  // expresion that's eval'd on the window to get the radio
  radioExpression: "app.wreqr",

  startSearch: function() {
    search(this, this.getApp());
  },

  stopSearch: function() {
    stopSearch(this, this.getApp());
  },

  highlightView: function(data) {
    var view = this.getView(data.viewPath);

    // unhighlight all of the views
    var $els = _.pluck(this.viewList(), '$el');
    _.each($els, unhighlightEl);

    highlightEl(view.$el)
  },

  unhighlightView: function(data) {
    var view = this.getView(data.viewPath);
    unhighlightEl(view.$el)
    return false;
  },

  // called by inspector to get the current region tree
  regionTree: function(path, shouldSerialize) {
    shouldSerialize = !_.isUndefined(shouldSerialize) ? shouldSerialize : true;
    path = path || '';
    var app = this.getApp();
    var tree = regionInspector(app, path, shouldSerialize);

    if (_.isEmpty(tree)) {
      tree = regionInspector(app.rootView, path, shouldSerialize);
    }

    return tree;
  },

  getView: function(path) {
    var subTree = this.regionTree(path, false);

    if (!subTree._view) {
      throw new Error('could not find view');
    }

    return subTree._view;
  },

  viewList: function() {
    var regionTree = this.regionTree('', false);
    return viewList(regionTree);
  },

  // called by the inspector to get the current channel list
  getChannelList: function() {},

  getApp: function() {
    return window.eval(this.appExpression);
  },

  isAppLoaded: function() {
    return window.eval("typeof " + this.appExpression + " !== 'undefined'");
  }

});

this.appObserver = new AppObserver();
