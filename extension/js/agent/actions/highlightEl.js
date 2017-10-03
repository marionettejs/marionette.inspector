;(function(Agent) {

  var highlightMaskEl;

  // setup the highlight mask
  document.addEventListener("DOMContentLoaded", function() {
    var $highlightMask = nanodom('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
    nanodom('body').prepend($highlightMask);
    highlightMaskEl = $highlightMask[0];
    highlightMaskEl.style['z-index'] = 10e10;
  });

  Agent.highlightEl = function($el) {
    // todo: support zepto
    var el = $el.jquery ? $el[0] : $el
    if (!(el instanceof HTMLElement) || !highlightMaskEl) {
      return;
    }

    var el_offset = Agent.getElementOffset(el);

    var isPresent = _.isEqual(Agent.getElementOffset(highlightMaskEl), el_offset);
    if (isPresent && highlightMaskEl.style.display !== 'none') {
      return;
    }

    highlightMaskEl.style.display = 'block';
    highlightMaskEl.style['pointer-events'] = 'none';
    Agent.setElementOffset(highlightMaskEl, el_offset);
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
