
/*
 * stopSearch stops DevTools.search()
 *
 */
this.stopSearch = function(appObserver, app) {
    var regionTree = appObserver.regionTree();
    var views = appObserver.viewList(regionTree);
    var $els = $(_.pluck(views, 'el'));

    $(document).off('mouseleave');
    _.each($els, function(el) {
        var $el = $(el);
        $el.removeAttr('data-view-id');
        $el.off('.regionSearch');
    }, this);

    this.unhighlightEl();
};
