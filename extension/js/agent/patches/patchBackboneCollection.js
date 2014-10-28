// @private
this.patchBackboneCollection = function(BackboneCollection) {
    debug.log("Backbone.Collection detected");

    patchBackboneComponent(BackboneCollection, bind(function(collection) { // on new instance
        // registra il nuovo componente dell'app
        var collectionIndex = registerAppComponent("Collection", collection);

        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        // monitorAppComponentProperty(collection, "model", 0);
        // monitorAppComponentProperty(collection, "models", 1);
        // monitorAppComponentProperty(collection, "url", 0);

        // Patcha i metodi del componente dell'app

        patchAppComponentTrigger(collection);
        patchAppComponentEvents(collection);
        patchAppComponentSync(collection);
    }, this));
}