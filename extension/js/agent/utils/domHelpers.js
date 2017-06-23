;(function(Agent) {

  function getOffset(el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }

  function setOffset(el, coord) {
    var curOffset = getOffset(el),
      curTop = parseFloat(el.style.top) || 0,
      curLeft = parseFloat(el.style.left) || 0;

    if ( typeof coord.top === 'number' ) {
      el.style.top = (( coord.top - curOffset.top ) + curTop) + 'px';
    }

    if ( typeof coord.left === 'number' ) {
      el.style.left = (( coord.left - curOffset.left ) + curLeft) + 'px';
    }
  }

  Agent.getElementOffset = getOffset;

  Agent.setElementOffset = setOffset;

}(Agent));
