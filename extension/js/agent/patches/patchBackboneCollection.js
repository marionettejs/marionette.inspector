// @private
this.patchBackboneCollection = function(BackboneCollection) {
    debug.log("Backbone.Collection detected");

    patchBackboneComponent(BackboneCollection, _.bind(function(collection) { // on new instance
        this.addCidToComponent(collection);

        // registra il nuovo componente dell'app
        var data = this.serializeCollection(collection);
        var collectionIndex = registerAppComponent("Collection", collection, data);
        debug.log('found new collection', collection, data);

        // Patcha i metodi del componente dell'app
        patchAppComponentTrigger(collection);
        patchAppComponentEvents(collection);
        patchAppComponentSync(collection);
    }, this));
}