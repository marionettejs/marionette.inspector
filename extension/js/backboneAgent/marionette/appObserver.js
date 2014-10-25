
var AppObserver = function() {
};

_.extend(AppObserver.prototype, {

  _: window._,

  // expression that's eval'd on the window to get the app
  appExpression: "app",

  // expresion that's eval'd on the window to get the radio
  radioExpression: "app.wreqr",

  // called by inspector to get the current region tree
  regionTree: function(path) {//
    path = path || '';
    return regionInspector(this.getApp(), path, true);
  },

  search: function() {
    search(this, this.getApp());
  },

  stopSearch: function() {
    stopSearch();
  },

  getView: function(path) {
    var subTree = regionInspector(this.getApp(), path);

    if (!subTree._view) {
      throw new Error('could not find view');
    }

    return subTree._view;
  },

  // called by the inspector to get the current channel list
  getChannelList: function() {},

  getApp: function() {
    var app = window.eval(this.appExpression);
    return app;
  },

  isAppLoaded: function() {
    return window.eval("typeof " + this.appExpression + " !== 'undefined'");
  }

});

this.appObserver = new AppObserver();
