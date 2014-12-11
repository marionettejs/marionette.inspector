this.patchViewUIChanges = function(view, prop, action, difference, oldValue) {
  this.sendAppComponentReport("view:ui:change", {
    cid: view.cid,
    data: {
      ui: this.serializeUI(view.ui)
    }
  })
}

var patchViewRemove = function(originalFunction) {
  return function() {
    var appComponent = this;
    var result = originalFunction.apply(appComponent, arguments);

    addAppComponentAction(appComponent, new AppComponentAction(
      "remove", ""
    ));

    return result;
  }
}

// @private
this.patchBackboneView = function(BackboneView) {
    debug.log("Backbone.View detected");

    patchBackboneComponent(BackboneView, bind(function(view) { // on new instance
        // registra il nuovo componente dell'app
        var data = this.serializeView(view);
        var viewIndex = registerAppComponent("View", view, data);


        // Patcha i metodi del componente dell'app
        patchAppComponentTrigger(view, 'view');

        onDefined(view, 'ui', _.bind(function() {
          onChange(view.ui, _.bind(this.patchViewUIChanges, this, view));
          this.patchViewUIChanges(view);
        }, this));

        patchAppComponentEvents(view);

        patchFunctionLater(view, "render", function(originalFunction) { return function() {
            var result = originalFunction.apply(this, arguments);

            addAppComponentAction(this, new AppComponentAction(
                "operation", "render"
            ));

            return result;
        }});

        patchFunctionLater(view, "remove", patchViewRemove);
    }, this));
}
