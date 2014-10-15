window._ = this._;

var AppObserver = function() {
  this.appExpression = "app"
  this.radioExpression = ""
};

_.extend(AppObserver.prototype, {

  // expression that's eval'd on the window to get the app
  appExpression: "app",

  // expresion that's eval'd on the window to get the radio
  radioExpression: "app.wreqr",

  // called by inspector to get the current region tree
  getRegionTree: function() {
    return regionInspector(this.getApp());
  },

  // called by the inspector to get the current channel list
  getChannelList: function() {},

  getApp: function() {
    var app = window.eval(this.appExpression);
    return app;
  }

});

this.appObserver = new AppObserver();



var regionInspector = function(app, path) {
  var regions = _regionInspector(app);
  if (!_.isUndefined(path)) {
    regions = objectPath(regions, path, {});
  }

  console.log('ri: ', regions);
  return regions;
};

var _regionInspector = function(obj) {
  if (!obj) {
    return {};
  }

  if (obj._regionManager) { // app
    var subViews = _subViews(obj);
    return subViews;

  } else if (obj.regionManager) { // layout
    var subViews = _subViews(obj);
    subViews._view = viewSerializer(obj) ; //obj;
    return subViews;

  } else if (obj.children) { // collection view
    return _.map(obj.children._views, _regionInspector);

  } else { // simple view
    return {
      _view: viewSerializer(obj) //obj
    }
  }
};

var _subViews = function(obj) {
  var subViews = {};
  var regions = (obj._regionManager || obj.regionManager)._regions;
  _.each(regions, function(region, regionName) {
    var subRegions = _regionInspector(region.currentView);
    subRegions._region = 'region' //region;
    subViews[regionName] = subRegions;
  });
  return subViews;
};

var viewSerializer = function(view) {
  var data = {};

  if (!_.isObject(view)) {
    return {};
  }

  data.cid = view.cid;
  data.ui = Object.keys(view.ui || {});
  data.events = Object.keys(view.events || {});
  data.options = Object.keys(view.options || {});

  data.element = serializeElement(view.el, true);

  data.model = {
    attributes: JSON.stringify({})
  };

  if (_.isObject(view.model)) {
      data.model = {
        cid: view.model.cid,
        attributes: JSON.stringify(view.model.attributes),
      }
  }

  console.log('serialize', data);
  return data;
}


var serializeElement = function (element, recurse) {
    var el = $(element),
        o = {
            tagName: el[0].tagName
        };

    _.each(el[0].attributes, function(attribute){
        o[attribute.name] = attribute.value;
    });

    if (recurse) {
        o.children = _.map(el.children(), function(child){
            return serializeElement(child, true);
        }, this);
    }
    return  o;
}
