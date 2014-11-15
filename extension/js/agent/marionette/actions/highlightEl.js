
// setup the highlight mask
$(document).ready(function() {
  var $highlightMask = $('<div id="highlightMask" class="marionette-inspector-highlighted-element" style="position: absolute;">');
  $('body').prepend($highlightMask);
  $highlightMask.css('z-index', 10e10);

  this.$highlightMask = $highlightMask;
}.bind(this))


this.highlightEl = function($el) {

  var $highlightMask = this.$highlightMask;
  if (!$el || !$highlightMask) {
    return;
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
}