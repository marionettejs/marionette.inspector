//// LOGIC ////

debug.active = true; // true for backbone agent debug mode
var hiddenPropertyPrefix = "__backboneDebugger__";

var onBackboneDetected = function(Backbone) {
  debug.log("Backbone detected: ", Backbone);

  // note: the Backbone object might be only partially defined.
  onceDefined(Backbone, "View", patchBackboneView);
  onceDefined(Backbone, "Model", patchBackboneModel);
  onceDefined(Backbone, "Collection", patchBackboneCollection);
  onceDefined(Backbone, "Router", patchBackboneRouter);
}


// @private
// Metodo eseguito automaticamente all'atto della creazione dell'oggetto.
this.initialize = function() {
    debug.log("Backbone agent is starting...");//

    patchDefine(onBackboneDetected);
    patchBackbone(onBackboneDetected);
}

this.initialize();
