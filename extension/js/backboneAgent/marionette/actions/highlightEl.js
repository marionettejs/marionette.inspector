var highlightEl = function($el) {
  $el.addClass('marionette-inspector-highlighted-element');
  debug.log('highlight', $el.get(0));
}