this.unhighlightEl = function() {

  var $highlightMask = $(window.highlightMask);

  if (!$highlightMask) {
    return;
  }

  $highlightMask.css('display', 'none');
}