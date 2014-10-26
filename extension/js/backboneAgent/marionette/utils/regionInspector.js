
var regionInspector = function(app, path, shouldSerialize) {
  shouldSerialize = !!shouldSerialize;

  var regions = _regionInspector(app, shouldSerialize)

  if (!!path) {
    regions = objectPath(regions, path, {});
  }

  debug.log('ri: ', regions);
  return regions;
};

var _regionInspector = function (obj, shouldSerialize) {


  if (!obj) {
    return {};
  }

  if (obj._regionManager) { // app
    var subViews = _subViews(obj, shouldSerialize);
    return subViews;

  } else if (obj.regionManager) { // layout
    var subViews = _subViews(obj, shouldSerialize);
    subViews._view =  shouldSerialize ? viewSerializer(obj) :  obj;
    return subViews;

  } else if (obj.children) { // collection view

    return _.map(obj.children._views, function(view) {
      return _regionInspector(view, shouldSerialize);
    }, this, _regionInspector, shouldSerialize);

  } else { // simple view
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
