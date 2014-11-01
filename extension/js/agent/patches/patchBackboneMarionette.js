

this.patchBackboneMarionette = function(modules) {
  var Backbone = this.patchedBackbone = modules.Backbone;
  var Marionette = this.patchedMarionette = modules.Marionette;

  debug.log("Backbone detected: ", Backbone);
  debug.log("Marionette detected: ", Marionette);

  this.patchBackboneView(Backbone.View)
  this.patchBackboneModel(Backbone.Model);
  this.patchBackboneCollection(Backbone.Collection);
  this.patchBackboneRouter(Backbone.Router);

  this.patchMarionetteApplication(Marionette.Application);
}
