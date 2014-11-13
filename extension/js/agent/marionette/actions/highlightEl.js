
$(document).ready(function() {
  var $highlightMask = $('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
  $('body').prepend($highlightMask);
  $highlightMask.css('z-index', 10e10);

  this.$highlightMask = $highlightMask;
}.bind(this))


this.highlightEl = function($el) {
  if (!$el) {
    return;
  }

  var $highlightMask = this.$highlightMask;
  if (!$highlightMask) {
    return;
  }

  var isPresent = $highlightMask.offset() == $el.offset();
  if (isPresent && $highlightMask.is(":visible")) {
    return;
  }

  $highlightMask.off();
  $highlightMask.on('mousedown', function(e) {
    $el.trigger('mousedown');
    return false;
  })

  $highlightMask.on('mousemove', function(e) {
    $highlightMask.css('z-index', -1)
    var $mouseEl = $(document.elementFromPoint(e.clientX, e.clientY));

    if ($mouseEl != $el) {
      $mouseEl.trigger('mouseover');
    }

    $highlightMask.css('z-index', 10e10);
    return false;
  });

  $highlightMask.on('mouseleave', function(e) {
    $el.trigger('mouseleave');
    return false;
  });

  $highlightMask.css('display', 'block');
  $highlightMask.offset($el.offset());
  $highlightMask.height($el.outerHeight());
  $highlightMask.width($el.outerWidth());

  // debug.log('highlight', $el.get(0));
}