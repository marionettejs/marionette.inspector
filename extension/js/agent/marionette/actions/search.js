/*
 * Search adds a view mouse discovery tool. Once on,
 * any view you hover over will get a blue bounding box and on click
 * the view will be saved to window.view.
 *
 *
 */

this.search = (function(agent) {

    /*
     * Search constructor starts the search mode
     *
     * @param {appObserver} - appObserver used to stop search
     * @param {app} - used to get the views and stop search
     */
    var Search = function(appObserver, app) {

      // this.regionTree = appObserver.regionTree();
      this.appObserver = appObserver;
      this.app = app;
      var views = appObserver.viewList();

      this.addViewCidAttributes(views);
      this.$clickMask = this.buildClickMask();

      $(document).mouseleave(function() {
        agent.unhighlightEl();
      }.bind(this));

      this.bindElEvents(views);

      console.log('start search', this);
    };

  _.extend(Search.prototype, {

    bindElEvents: function(views) {
      var mouse_events = {
        'mouseover.regionSearch' : _.bind(this.onMouseOver, this),
        'mouseleave.regionSearch': _.bind(this.onMouseLeave, this),
        'mousedown.regionSearch' : _.bind(this.onMouseDown, this)
      };

      _.each(views, function(view){
        view.$el.on(mouse_events);
      });
    },

    onMouseOver: function(e) {
      e.stopPropagation();
      var $current = $(e.currentTarget);
      var cid = $current.attr('data-view-id');

      agent.highlightEl($current);

      agent.sendAppComponentReport('search', {
        name: 'mouseover',
        cid: cid
      });
    },

    onMouseLeave: function(e) {
      e.stopPropagation();
      var $current = $(e.currentTarget);
      var cid = $current.attr('data-view-id');

      agent.sendAppComponentReport('search', {
        name: 'mouseleave',
        cid: cid
      });
    },

    onMouseDown: function(e) {
      e.stopPropagation();
      var $current = $(e.currentTarget);
      var cid = $current.attr('data-view-id');

      this.placeClickElMask($current);

      agent.stopSearch(this.appObserver, this.app);

      agent.sendAppComponentReport('search', {
        name: 'mousedown',
        cid: cid
      }, {immediate: true});

      return false;
    },


    /*
     * Creates a mask over the element which captures click events.
     * This is used because we don't want click events to on the view's
     * element to be captured.
     */
    buildClickMask: function() {
      var $clickMask = $('<div id="regionSearch-click-mask" style="position: absolute;">');
      $('body').prepend($clickMask);
      $clickMask.css('z-index', 10e10);

      return $clickMask;
    },

    placeClickElMask: function($el) {
      var $clickMask = this.$clickMask;

      $clickMask.offset($el.offset());
      $clickMask.height($el.outerHeight());
      $clickMask.width($el.outerWidth());

      $clickMask.on('click mouseup mouseout', function() {
        $clickMask.remove();
      });
    },

    addViewCidAttributes: function(views) {
      _.each(views, function addCid(view) {
        view.$el.attr('data-view-id', view.cid);
      });
    }
  })

  return function(appObserver, app) {
    return new Search(appObserver, app);
  }
}(this));

