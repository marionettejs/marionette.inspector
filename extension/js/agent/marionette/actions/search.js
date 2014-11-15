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
      var $els = _.pluck(views, '$el');

      this.addViewCidAttributes(views);
      this.viewCidMap = this.createViewCidMap($els, views);
      this.$clickMask = this.buildClickMask()
      this.$currentEl = undefined;

      $(document).mouseleave(function() {
        agent.unhighlightEl();
      }.bind(this))
      this.bindElEvents($els);

      console.log('start search', this);
    };

  _.extend(Search.prototype, {
    /* The viewCidMap is used to look up a view by it's cid.
     * This is useful because we add a view-cid attribute to each view's element
     * And we use that to find the view when the element is hovered or clicked on.
     */
    createViewCidMap: function(views) {
      return _.object(_.pluck(views, 'cid'), views);
    },

    bindElEvents: function($els) {
      _.each($els, function($el) {
        $el.on('mouseover.regionSearch', _.bind(this.onMouseOver, this));
        $el.on('mouseleave.regionSearch', _.bind(this.onMouseLeave, this));
        $el.on('mousedown.regionSearch', _.bind(this.onMouseDown, this));
      }, this);
    },

    onMouseOver: function(e) {
      e.stopPropagation();

      var $current = $(e.currentTarget);
      this.$currentEl = $current;

      var cid = this.$currentEl.attr('data-view-id');
      var view = this.viewCidMap[cid];

      agent.highlightEl($current);

      agent.sendAppComponentReport('search', {
        name: 'mouseover',
        cid: cid
      })
    },

    onMouseLeave: function(e) {
      e.stopPropagation();
      var $current = $(e.currentTarget);
      var cid = $current.attr('data-view-id');

      agent.sendAppComponentReport('search', {
        name: 'mouseleave',
        cid: cid
      })
    },

    onMouseDown: function(e) {
      e.stopPropagation();
      var $current = $(e.currentTarget);
      var cid = $current.attr('data-view-id');

      this.placeClickElMask($current);

      var view = this.viewCidMap[cid];
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

      $clickMask.on('click', function() {
        $clickMask.remove();
      });
      $clickMask.on('mouseup', function() {
        $clickMask.remove();
      });
      $clickMask.on('mouseout', function() {
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

