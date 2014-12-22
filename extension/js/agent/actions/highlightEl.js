;(function(Agent) {

  // setup the highlight mask
  $(document).ready(function() {
    var $highlightMask = $('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
    $('body').prepend($highlightMask);
    $highlightMask.css('z-index', 10e10);

    Agent.$highlightMask = $highlightMask;
  });

  Agent.highlightEl = function($el) {
    var $highlightMask = Agent.$highlightMask;
    if (!$el || !$highlightMask) {
      return;
    }

    if (!($el instanceof jQuery)) {
      $el = $($el);
    }

    var isPresent = $highlightMask.offset() == $el.offset();
    if (isPresent && $highlightMask.is(":visible")) {
      return;
    }

    $highlightMask.css('display', 'block');
    $highlightMask.css('pointer-events', 'none')
    $highlightMask.offset($el.offset());
    $highlightMask.height($el.outerHeight());
    $highlightMask.width($el.outerWidth());

    // debug.log('highlight', $el.get(0));
  };

  Agent.unhighlightEl = function() {
    var $highlightMask = $(window.highlightMask);

    if (!$highlightMask) {
      return;
    }

    $highlightMask.css('display', 'none');
  };


}(this));
