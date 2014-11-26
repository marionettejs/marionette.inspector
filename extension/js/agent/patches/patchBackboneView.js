this.patchViewChanges = _.debounce(function(view, prop, action, difference, oldValue) {
  this.lazyWorker.push({
    context: this,
    args: [view],
    callback: function(view) {
      this.sendAppComponentReport("view:change", {
        cid: view.cid,
        data: this.serializeView(view)
      });
    }
  });
}, 200);

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

    patchBackboneComponent(BackboneView, _.bind(function(view) { // on new instance
        this.lazyWorker.push({
          context: this,
          args: [view],
          callback: function(view) {
            // registra il nuovo componente dell'app
            var data = this.serializeView(view)
            this.registerAppComponent("View", view, data);
            this.sendAppComponentReport("view:change", {
              data: data,
              cid: view.cid
            });
          }
        });


        // Patcha i metodi del componente dell'app
        patchAppComponentTrigger(view, 'view');

        onDefined(view, 'ui', _.bind(function() {
          onChange(view.ui, _.bind(this.patchViewChanges, this, view));
          this.patchViewChanges(view);
        }, this));

        onDefined(view, '_events', _.bind(function() {
          onChange(view._events, _.bind(this.patchViewChanges, this, view));
          this.patchViewChanges(view);
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
