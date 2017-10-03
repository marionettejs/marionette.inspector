/*
 * Search adds a view mouse discovery tool. Once on,
 * any view you hover over will get a blue bounding box and on click
 * the view will be saved to window.view.
 *
 *
 */

;(function(Agent) {

    var observedElements = [];

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
      this.clickMaskEl = this.buildClickMask();
      this.searchEnabled = true;

      document.addEventListener('mouseleave', this.onDocumentMouseLeave);

      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);

      this.bindElEvents(views);


      console.log('start search', this);
    };

  _.extend(Search.prototype, {

    bindElEvents: function(views) {
      var mouse_events = {
        'mouseover' : this.onMouseOver,
        'mouseleave': this.onMouseLeave,
        'mousedown' : this.onMouseDown
      };

      var els = _.pluck(views, 'el');
      var elEvents = els.map(function (el) {
        return {el: el, events: mouse_events}
      })
      observedElements = observedElements.concat(elEvents);

      _.each(els, function(el){
        _.each(mouse_events, function (value, key) {
          el.addEventListener(key, value);
        });
      });
    },

    onMouseOver: function(e) {
      if (!this.searchEnabled) {
        return;
      }
      e.stopPropagation();
      var current = e.currentTarget;
      var cid = current.getAttribute('data-view-id');

      Agent.highlightEl(current);

      Agent.sendAppComponentReport('search', {
        name: 'mouseover',
        cid: cid
      });
    },

    onMouseLeave: function(e) {
      if (!this.searchEnabled) {
        return;
      }
      e.stopPropagation();
      var current = e.currentTarget;
      var cid = current.getAttribute('data-view-id');

      Agent.sendAppComponentReport('search', {
        name: 'mouseleave',
        cid: cid
      });
    },

    onMouseDown: function(e) {
      if (!this.searchEnabled) {
        return;
      }
      e.stopPropagation();
      var current = e.currentTarget;
      var cid = current.getAttribute('data-view-id');

      this.placeClickElMask(current);

      this.searchEnabled = false;
      Agent.stopSearch();

      Agent.sendAppComponentReport('search', {
        name: 'mousedown',
        cid: cid
      }, {immediate: true});

      return false;
    },

    onDocumentMouseLeave: function (e) {
      if (!_.findWhere(observedElements, {el: e.currentTarget})) return;
      Agent.stopSearch();
      Agent.unhighlightEl();
    },


    /*
     * Creates a mask over the element which captures click events.
     * This is used because we don't want click events to on the view's
     * element to be captured.
     */
    buildClickMask: function() {
      var $clickMask = nanodom('<div id="regionSearch-click-mask" style="position: absolute;">');
      nanodom('body').prepend($clickMask);
      var clickMaskEl = $clickMask[0]
      clickMaskEl.style['z-index'] = 10e10;

      return clickMaskEl;
    },

    placeClickElMask: function(el) {
      var clickMaskEl = this.clickMaskEl;

      Agent.setElementOffset(clickMaskEl, Agent.getElementOffset(el));
      clickMaskEl.style.height = el.offsetHeight + 'px';
      clickMaskEl.style.width = el.offsetWidth + 'px';

      ['click', 'mouseup', 'mouseout'].forEach(function (event) {
        clickMaskEl.addEventListener(event, function () {
          if (clickMaskEl.parentNode) clickMaskEl.parentNode.removeChild(clickMaskEl);
        })
      })
    },

    addViewCidAttributes: function(views) {
      _.each(views, function addCid(view) {
        view.el.setAttribute('data-view-id', view.cid);
      });
    }
  })

  Agent.startSearch = function(appObserver, app) {
    return new Search(appObserver, app);
  }

  /*
   * stopSearch stops the magnifying glass
   * it also unbinds all of the events and clears the observedElements cache
   *
   */
  Agent.stopSearch = function() {
    _.each(observedElements, function(elEvents) {
      var el = elEvents.el
      _.each(elEvents.events, function (value, key) {
        el.removeEventListener(key, value)
      });
      el.removeAttribute('data-view-id');
    });

    observedElements = [];

    document.removeEventListener('mouseleave', Search.prototype.onDocumentMouseLeave);
    Agent.unhighlightEl();
  };

}(Agent));

