/*
 * search adds a view mouse discovery tool. Once on,
 * any view you hover over will get a blue bounding box and on click
 * the view will be saved to window.view.
 *
 * TODOS:
 * 1. when mousing out of a nested region, we need to highlight the outer region
 * 3. show the region path in the bottom left
 */
var search = function(appObserver, app) {
    var regionTree = regionInspector(app, '', false);
    var views = appObserver.viewList();

    var $els = [];
    _.each(views, function(view) {
        var $el = view.$el;
        $els.push($el);
        $el.attr('data-view-id', view.cid);
    });
    var elsViewMap = _.object(_.pluck(views, 'cid'), views);
    var $elMask;
    var $currentEl;

    // show the region path in the bottom left
    // 1. need a regionPathEl map - which i can get by search the regionTree
    // 2. need to show a div, which i can keep in scope

    _.each($els, function($el) {
        $el.on('mouseover.regionSearch', function(e) {
            e.stopPropagation();

            var $current = $(e.currentTarget);
            $currentEl = $current;
            var cid = $currentEl.attr('data-view-id');
            var view = elsViewMap[cid];

            _.each($els, unhighlightEl);
            highlightEl($current);


            // showViewSummary(view);
            sendAppComponentReport('search', {
              name: 'mouseover',
              cid: cid 
            })
        });

        $el.on('mouseleave.regionSearch', function(e) {
            e.stopPropagation();
            var $current = $(e.currentTarget);
            var cid = $current.attr('data-view-id');

            unhighlightEl($current);

            sendAppComponentReport('search', {
              name: 'mouseleave',
              cid: cid 
            })
        });

        $el.on('mousedown.regionSearch', function(e) {
            e.stopPropagation();
            var $current = $(e.currentTarget);
            var cid = $current.attr('data-view-id');

            $elMask = _createElMask($current);

            var view = elsViewMap[$currentEl.attr('data-view-id')];
            console.log('window.view = ', view);
            window.view = view;
            stopSearch(app);

            sendAppComponentReport('search', {
              name: 'mousedown',
              cid: cid 
            });

            return false;
        });

        // move the mousedown handler to the front
        // would also have to handle subtree mousedown handlers too
            //var events = $._data($el[0], 'events');
            //mouseDownHandlers.unshift(mouseDownHandlers.pop());

    }, this);
};

/*
 * creates a mask over the element which captures click events
 * this is used because we don't want click events to on the view's
 * element to be captured.
 */
var _createElMask = function($el) {
    var $elMask = $('<div style="position: absolute;">');
    $elMask.offset($el.offset());
    $elMask.height($el.outerHeight());
    $elMask.width($el.outerWidth());
    $('body').prepend($elMask);
    $elMask.css('z-index', 10e10);

    $elMask.on('click', function() {
        $elMask.remove();
    });

    $elMask.on('mouseup', function() {
        $elMask.remove();
    });

    $elMask.on('mouseout', function() {
        $elMask.remove();
    });
    return $elMask;
};
