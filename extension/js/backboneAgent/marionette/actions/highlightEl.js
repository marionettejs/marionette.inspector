var highlightEl = function($el) {
  var oldBackground = $el.css('background');
  var oldOutline = $el.css('outline');
  $el
    .css('outline', 'rgba(161, 202, 223, 0.67)')
    .css('background', 'rgba(217, 237, 247, 0.67)')
    .data('old-background', oldBackground)
    .data('old-outline', oldOutline);

    debug.log('highlight', $el.get(0), oldBackground, oldOutline);
}