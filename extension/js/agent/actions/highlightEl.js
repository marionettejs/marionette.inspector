;(function(Agent) {

  var $highlightMask;

  // setup the highlight mask
  $(document).ready(function() {
    $highlightMask = $('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
    $('body').prepend($highlightMask);
    $highlightMask.css('z-index', 10e10);
  });

  Agent.highlightEl = function($el) {
    if (!$el || !$highlightMask) {
      return;
    }

    if (!($el instanceof jQuery)) {
      $el = $($el);
    }

    var el_offset = $el.offset();

    var isPresent = _.isEqual($highlightMask.offset(), el_offset);
    if (isPresent && $highlightMask.is(":visible")) {
      return;
    }

    $highlightMask.css('display', 'block');
    $highlightMask.css('pointer-events', 'none')
    $highlightMask.offset(el_offset);
    $highlightMask.height($el.outerHeight());
    $highlightMask.width($el.outerWidth());

    // debug.log('highlight', $el.get(0));
  };

  Agent.unhighlightEl = function() {
    if (!$highlightMask) {
      return;
    }

    $highlightMask.css('display', 'none');
  };


}(this));
