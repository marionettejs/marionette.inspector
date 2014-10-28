/*
 * Reduce a regionTree to a list of currently shown views.
 * Used in search to get a list of views to add hover/click events to
 */
var viewList = function(regionTree) {
    if (_.isEmpty(regionTree)) {
        return [];
    }

    var view = regionTree._view ? [regionTree._view] : [];
    var subRegionTrees = _.chain(regionTree).omit('_view', '_region').values().reject(_pruneSubRegionTree).value();
    var subViews = _.map(subRegionTrees, viewList);

    return _.flatten(view.concat(subViews));
}


/*
 * remove regionTree properties that are functions (highlight)
 * or are empty arrays (regions that aren't populated)
 */
var _pruneSubRegionTree = function(subRegionTree) {
    if(_.isFunction(subRegionTree)) {
       return true;
    }

   if(_.isArray(subRegionTree) && subRegionTree.length == 0) {
       return true;
   }

   return false;
};
