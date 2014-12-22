
var AppObserver = function(agent) {
  this.agent = agent;
};

_.extend(AppObserver.prototype, {

  _: window._,

  // expression that's eval'd on the window to get the app
  appExpression: "__agent.patchedApp",

  // expresion that's eval'd on the window to get the radio
  radioExpression: "app.wreqr",

  startSearch: function() {
    this.agent.startSearch(this, this.getApp());
  },

  stopSearch: function() {
    this.agent.stopSearch(this, this.getApp());
  },

  highlightView: function(data) {
    var view = this.getView(data.viewPath);

    if (!view) {
      return;
    }

    this.agent.highlightEl(view.$el)
  },

  unhighlightView: function(data) {
    var view = this.getView(data.viewPath);

    if (!view) {
      return;
    }

    this.agent.unhighlightEl(view.$el)
    return false;
  },

  // called by inspector to get the current region tree
  regionTree: function(path, shouldSerialize) {
    shouldSerialize = !_.isUndefined(shouldSerialize) ? shouldSerialize : true;
    if (shouldSerialize) {
      debug.log('serialized regionTree requested')
    }

    path = path || '';
    var app = this.getApp();
    var tree = this.agent.regionInspector(app, path, shouldSerialize);

    if (_.isEmpty(tree)) {
      tree = this.agent.regionInspector(app.rootView || app.layout, path, shouldSerialize);
    }

    return tree;
  },

  getRegionTree: function(path, shouldSerialize) {
    var tree = this.regionTree(path, shouldSerialize);
    this.agent.sendAppComponentReport("ui:regionTree", tree);
  },

  getView: function(path) {
    var subTree = this.regionTree(path, false);

    if (!subTree._view) {
      debug.log('getView: could not find view at path ' + path);
      return false;
    }

    return subTree._view;
  },

  viewList: function() {
    var regionTree = this.regionTree('', false);
    return this.agent.viewList(regionTree);
  },

  // called by the inspector to get the current channel list
  getChannelList: function() {},

  getApp: function() {
    return this.agent.patchedApp || window.app;
  },

  isAppLoaded: function() {
    return window.eval("typeof " + this.appExpression + " !== 'undefined'");
  }

});

this.appObserver = new AppObserver(this);
