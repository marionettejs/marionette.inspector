
var regionInspector = function(regionTreeRoot, path, shouldSerialize) {
  shouldSerialize = !!shouldSerialize;

  var regions = _regionInspector(regionTreeRoot, shouldSerialize)

  if (!!path) {
    regions = objectPath(regions, path, {});
  }

  debug.log('region inspector: ', regions);
  return regions;
};

var _regionInspector = function (obj, shouldSerialize) {

  if (!obj) {
    return {};
  }

  if (obj._regionManager) { // app
    debug.log('ri: found app');
    var subViews = _subViews(obj, shouldSerialize);
    return subViews;

  } else if (obj.regionManager) { // layout
    debug.log('ri: found layout');
    var subViews = _subViews(obj, shouldSerialize);
    subViews._view =  shouldSerialize ? viewSerializer(obj) :  obj;
    return subViews;

  } else if (obj.children) { // collection view
    debug.log('ri: found collection view');

    return _.map(obj.children._views, function(view) {
      return _regionInspector(view, shouldSerialize);
    }, this, _regionInspector, shouldSerialize);

  } else { // simple view
    debug.log('ri: found simple view');

    return {
      _view: shouldSerialize ? viewSerializer(obj) :  obj
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
  });
  return subViews;
};


// this.objectPath = objectPath;
