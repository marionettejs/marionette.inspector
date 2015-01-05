;(function(Agent) {

  var _regionInspector = function (obj, shouldSerialize) {
    if (!obj) {
      return {};
    }

    if (obj._regionManager) { // app
      //debug.log('ri: found app');
      var subViews = _subViews(obj, shouldSerialize);
      return subViews;

    } else if (obj.regionManager) { // layout
      //debug.log('ri: found layout');
      var subViews = _subViews(obj, shouldSerialize);
      subViews._view =  shouldSerialize ? serializeView(obj) :  obj;
      return subViews;

    } else if (obj.children) { // collection view
      //debug.log('ri: found collection view');

      var subViews = {};
      _.each(obj.children._views, function(view, index) {
        subViews[index] = _regionInspector(view, shouldSerialize);
      }, this, subViews, shouldSerialize);

      subViews._view =  shouldSerialize ? serializeView(obj) :  obj;
      return subViews;

    } else { // simple view
      //debug.log('ri: found simple view');

      return {
        _view: shouldSerialize ? serializeView(obj) :  obj
      }
    }
  };

  var _subViews = function(obj, shouldSerialize) {
    var subViews = {};
    var regions = (obj._regionManager || obj.regionManager)._regions;
    _.each(regions, function(region, regionName) {
      var subRegions = _regionInspector(region.currentView, shouldSerialize);
      subRegions._region = 'region' //region;
      subViews[regionName] = subRegions;
    }, this);
    return subViews;
  };

  var serializeView = function(view) {
    var data = {};
    // debug.log('serializeView', view)

    if (!_.isObject(view)) {
      return {};
    }

    data.cid = view.cid;
    return data;
  };

  /*
  * regionInspector
  *
  * @param {regionTreeRoot} - could be an app or a view
  * @param {path} - the path is used to get a subtree. e.g. 'header.body' will get only the region tree inside the header body
  * @param {shouldSerialize} - should the region tree serialize the views
  */

  Agent.regionInspector = function(regionTreeRoot, path, shouldSerialize) {
    shouldSerialize = !!shouldSerialize;

    var regions = _regionInspector(regionTreeRoot, shouldSerialize)

    if (!!path) {
      regions = Agent.objectPath(regions, path, {});
    }

    //debug.log('region inspector: ', regions);
    return regions;
  }

}(this));
