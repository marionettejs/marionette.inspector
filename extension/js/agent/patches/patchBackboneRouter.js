// @private
var patchBackboneRouter = bind(function(BackboneRouter) {
    debug.log("Backbone.Router detected");

    patchBackboneComponent(BackboneRouter, bind(function(router) { // on new instance
        // registra il nuovo componente dell'app
        var routerIndex = registerAppComponent("Router", router);

        // Patcha i metodi del componente dell'app

        patchAppComponentTrigger(router);
        patchAppComponentEvents(router);
    }, this));
}, this);

