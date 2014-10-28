var unhighlightEl = function($el) {
	if (!$el) {
    return;
  }

  $el.removeClass('marionette-inspector-highlighted-element');
	debug.log('unhighlight', $el.get(0));
}