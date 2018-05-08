;(function(Agent) {

  Agent.AppObserver = function() { };

  _.extend(Agent.AppObserver.prototype, {

    startSearch: function() {
      Agent.startSearch(this, this.getApp());
    },

    stopSearch: function() {
      Agent.stopSearch(this, this.getApp());
    },

    highlightView: function(data) {
      var view = this.getView(data.viewPath);

      if (!view) {
        return;
      }

      Agent.highlightEl(view.$el)
    },

    unhighlightView: function(data) {
      var view = this.getView(data.viewPath);

      if (!view) {
        return;
      }

      Agent.unhighlightEl(view.$el)
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
      var tree = Agent.regionInspector(app, path, shouldSerialize);

      if (_.isEmpty(tree)) {
        tree = Agent.regionInspector(app.rootView || app.layout, path, shouldSerialize);
      }

      return tree;
    },

    getRegionTree: function(path, shouldSerialize) {
      var tree = this.regionTree(path, shouldSerialize);
      Agent.sendAppComponentReport('ui:regionTree', tree, {
        immediate: true
      });
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
      return Agent.viewList(regionTree);
    },

    // called by the inspector to get the current channel list
    getChannelList: function() {},

    getApp: function() {
      return Agent.patchedApp || window.app;
    },

    isAppLoaded: function() {
      return !!(window.__agent && window.__agent.patchedApp);
    }

  });


}(Agent));

this.appObserver = new this.AppObserver();
