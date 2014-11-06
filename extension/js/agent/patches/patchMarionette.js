this.patchMarionette = function(Backbone, Marionette) {

  if (this.patchedMarionette) {
    debug.log('Backbone was detected again');
    return;
  }

  var Marionette = this.patchedMarionette = Marionette;
  debug.log("Marionette detected: ", Marionette);

  this.patchMarionetteApplication(Marionette.Application);
}
