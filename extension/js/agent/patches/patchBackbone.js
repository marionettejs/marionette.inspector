this.patchBackbone = function(Backbone) {
  var Backbone = this.patchedBackbone = Backbone;

  debug.log("Backbone detected: ", Backbone);

  this.patchBackboneView(Backbone.View)
  this.patchBackboneModel(Backbone.Model);
  this.patchBackboneCollection(Backbone.Collection);
  this.patchBackboneRouter(Backbone.Router);
}
