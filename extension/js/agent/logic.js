//// LOGIC ////

var hiddenPropertyPrefix = "__backboneDebugger__";

var onModulesDetected = function(modules) {
  var Backbone = modules.Backbone;
  var Marionette = modules.Marionette;

  debug.log("Backbone detected: ", Backbone);

  // note: the Backbone object might be only partially defined.
  onceDefined(Backbone, "View", patchBackboneView);
  onceDefined(Backbone, "Model", patchBackboneModel);
  onceDefined(Backbone, "Collection", patchBackboneCollection);
  onceDefined(Backbone, "Router", patchBackboneRouter);

  this.patchMarionetteApplication(Marionette.Application);
}


// @private
// Metodo eseguito automaticamente all'atto della creazione dell'oggetto.
this.initialize = function() {
    debug.log("Backbone agent is starting...");//

    patchDefine(_.bind(onModulesDetected, this));
    patchBackbone(_.bind(onModulesDetected, this));
}

this.initialize();
