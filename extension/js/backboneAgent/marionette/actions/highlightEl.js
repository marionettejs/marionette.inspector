var highlightEl = function($el) {
  var oldBackground = $el.css('background');
  var oldOutline = $el.css('outline');
  $el
    .css('outline', '2px solid #cf2227')
    .css('background', 'rgba(245, 159, 115, 0.18)')
    .data('old-background', oldBackground)
    .data('old-outline', oldOutline);

    debug.log('highlight', $el.get(0), oldBackground, oldOutline);
}