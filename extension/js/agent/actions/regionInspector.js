;(function(Agent) {

  var _regionInspector = function (obj, shouldSerialize) {
    if (!obj) {
      return {};
    }

    if (obj._regionManager) { // app v2
      //debug.log('ri: found app');
      var subViews = _subViews(obj._regionManager._regions, shouldSerialize);
      return subViews;

    } else if (obj.regionManager) { // layout v2
      //debug.log('ri: found layout');
      var subViews = _subViews(obj.regionManager._regions, shouldSerialize);
      subViews._view = shouldSerialize ? serializeView(obj) : obj;
      return subViews;

    } else if (obj._region) { // app v3
      //debug.log('ri: found app');
      var subViews = _subViews({appregion: obj._region}, shouldSerialize);
      return subViews;

    } else if (obj._regions) { // view v3
      //debug.log('ri: found view');
      var subViews = _subViews(obj._regions, shouldSerialize);
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

    } else { // simple view v2
      //debug.log('ri: found simple view');

      if (Agent.mnVersion === '3') return;

      return {
        _view: shouldSerialize ? serializeView(obj) :  obj
      }
    }
  };

  var _subViews = function(regions, shouldSerialize) {
    var subViews = {};
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

}(Agent));
