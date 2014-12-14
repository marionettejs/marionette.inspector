this.isNativeFunction = function(func) {
  var funcStr = func.toString()
  return funcStr.match(/native code/) || funcStr.match(/function bound()/);
}