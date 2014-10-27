var highlightEl = function($el) {
  if (!$el) {
    return;
  }

  $el.addClass('marionette-inspector-highlighted-element');

  debug.log('highlight', $el.get(0));
}