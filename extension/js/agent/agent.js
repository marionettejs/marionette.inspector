
var hiddenPropertyPrefix = "__backboneDebugger__";

var onModulesDetected = function(modules) {
  var Backbone = modules.Backbone;
  var Marionette = modules.Marionette;

  debug.log("Backbone detected: ", Backbone);
  debug.log("Marionette detected: ", Marionette);

  this.patchBackboneView(Backbone.View)
  this.patchBackboneModel(Backbone.Model)
  this.patchBackboneCollection(Backbone.Collection)
  this.patchBackboneRouter(Backbone.Router)

  this.patchMarionetteApplication(Marionette.Application);
}

// Metodo eseguito automaticamente all'atto della creazione dell'oggetto.
this.initialize = function() {
    debug.log("Backbone agent is starting...");//

    patchDefine(_.bind(onModulesDetected, this));
    patchBackbone(_.bind(onModulesDetected, this));
}

this.initialize();