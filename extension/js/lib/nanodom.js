// an adaptation from https://github.com/asbjornenge/nanodom

;(function (root) {
  function Dom() {}
  Dom.prototype             = new Array;
  Dom.prototype.append      = function(element)   { element.forEach(function(e) { this[0].appendChild(e) }.bind(this)); return this }
  Dom.prototype.remove      = function()          { this.forEach(function(e) {e.parentNode.removeChild(e)}); return this }
  Dom.prototype.prepend     = function(element)   { element.forEach(function(e) { this[0].insertBefore(e, (this[0].hasChildNodes()) ? this[0].childNodes[0] : null) }.bind(this)); return this }
  Dom.prototype.each        = function(fn)        { this.forEach(fn); return this }

  function domify(str) { var d = document.createElement('div'); d.innerHTML = str; return d.childNodes }

  root.nanodom = function(selector) {
    var d
    if (selector instanceof Dom) return selector
    if (selector instanceof HTMLElement) {d = new Dom(); d.push(selector); return d}
    if (typeof selector !== 'string') return
    d = new Dom()
    var s, c=(selector.indexOf('<') === 0);
    s = c ? domify(selector) : document.querySelectorAll(selector);
    [].slice.call(s).forEach(function(e) {d.push(e)})
    return d
  }
})(this);
