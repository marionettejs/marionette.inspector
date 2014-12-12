
/*
 * stopSearch stops DevTools.search()
 *
 */
this.stopSearch = function() {
    _.each(this.observedElements, function($el) {
        $el.off('.regionSearch');
        $el.removeAttr('data-view-id');
    });

    this.observedElements = [];

    $(document).off('mouseleave');
    this.unhighlightEl();
};
