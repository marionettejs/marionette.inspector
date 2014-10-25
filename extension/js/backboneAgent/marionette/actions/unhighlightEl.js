var unhighlightEl = function($el) {
	$el.removeClass('marionette-inspector-highlighted-element');
	 debug.log('unhighlight', $el.get(0));
}