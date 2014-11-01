// @private
this.patchBackboneModel = function(BackboneModel) {
    debug.log("Backbone.Model detected");

    patchBackboneComponent(BackboneModel, bind(function(model) { // on new instance
        // registra il nuovo componente dell'app

        var data = {};

        var attrs = {};
        _.each(model.attributes, function(attr, key) {
            attrs[key] = this.serializeObject(attr);
        }, this);


        data.inspectedAttributes = attrs;
        data.attributes = JSON.stringify(model.attributes);
        data.cid = model.cid;

        var modelIndex = registerAppComponent("Model", model, data);

        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        // monitorAppComponentProperty(model, "attributes", 1);
        // monitorAppComponentProperty(model, "id", 0);
        // monitorAppComponentProperty(model, "cid", 0);
        // monitorAppComponentProperty(model, "urlRoot", 0); // usato dal metodo url() (insieme a collection)
        // monitorAppComponentProperty(model, "collection", 0);

        // Patcha i metodi del componente dell'app

        patchAppComponentTrigger(model);
        patchAppComponentEvents(model);
        patchAppComponentSync(model);
    }, this));
}
