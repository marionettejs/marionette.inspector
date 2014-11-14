this.unhighlightEl = function() {

  var $highlightMask = $(window.highlightMask);
  $highlightMask.offset({top:-100, left:-100});
  $highlightMask.height(1);
  $highlightMask.width(1);
}