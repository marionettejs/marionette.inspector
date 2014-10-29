//// LOGIC ////

var hiddenPropertyPrefix = "__backboneDebugger__";

var onBackboneDetected = function(Backbone) {
  debug.log("Backbone detected: ", Backbone);

  this.windowBackbone = Backbone;
  this.windowMarionette = window.Marionette || this.Marionette;

  this.patchBackboneView(Backbone.View)
  this.patchBackboneModel(Backbone.Model)
  this.patchBackboneCollection(Backbone.Collection)
  this.patchBackboneRouter(Backbone.Router)
}

// @private
// Metodo eseguito automaticamente all'atto della creazione dell'oggetto.
this.initialize = function() {
    debug.log("Backbone agent is starting...");//

    patchDefine(_.bind(onBackboneDetected, this));
    patchBackbone(_.bind(onBackboneDetected, this));
}

this.initialize();
