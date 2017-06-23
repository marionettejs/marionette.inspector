;(function(Agent) {

  var highlightMaskEl;

  // setup the highlight mask
  document.addEventListener("DOMContentLoaded", function() {
    var $highlightMask = nanodom('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
    nanodom('body').prepend($highlightMask);
    highlightMaskEl = $highlightMask[0];
    highlightMaskEl.style['z-index'] = 10e10;
  });

  function getOffset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  function setOffset(el, coord) {
    var curOffset = getOffset(el),
      curTop = parseFloat(el.style.top) || 0,
      curLeft = parseFloat(el.style.left) || 0;

    if ( typeof coord.top === 'number' ) {
      el.style.top = (( coord.top - curOffset.top ) + curTop) + 'px';
    }

    if ( typeof coord.left === 'number' ) {
      el.style.left = (( coord.left - curOffset.left ) + curLeft) + 'px';
    }
  }

  Agent.highlightEl = function($el) {
    // todo: support zepto
    var el = $el.jquery ? $el[0] : $el
    if (!(el instanceof HTMLElement) || !highlightMaskEl) {
      return;
    }

    var el_offset = getOffset(el);

    var isPresent = _.isEqual(getOffset(highlightMaskEl), el_offset);
    if (isPresent && highlightMaskEl.style.display !== 'none') {
      return;
    }

    highlightMaskEl.style.display = 'block';
    highlightMaskEl.style['pointer-events'] = 'none';
    setOffset(highlightMaskEl, el_offset);
    highlightMaskEl.style.height = el.offsetHeight + 'px';
    highlightMaskEl.style.width = el.offsetWidth + 'px';

    // debug.log('highlight', $el.get(0));
  };

  Agent.unhighlightEl = function() {
    if (!highlightMaskEl) {
      return;
    }

    highlightMaskEl.style.display = 'none';
  };


}(Agent));
