var unhighlightEl = function($el) {
	var oldOutline = $el.data('old-outline');
	var oldBackground = $el.data('old-background');
	$el
	  .css('outline', oldOutline)
	  .css('background', oldBackground)
	  .data('old-outline','')
	  .data('old-background', '');

	  debug.log('unhighlight', $el.get(0), oldBackground, oldOutline);
}