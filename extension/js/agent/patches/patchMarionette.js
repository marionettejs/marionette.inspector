this.patchMarionette = function(Backbone, Marionette) {
  var Marionette = this.patchedMarionette = Marionette;
  debug.log("Marionette detected: ", Marionette);

  this.patchMarionetteApplication(Marionette.Application);
}
