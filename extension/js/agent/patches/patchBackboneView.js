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

        // monitora i cambiamenti alle proprietà d'interesse del componente dell'app
        // monitorAppComponentProperty(view, "model", 0);
        // monitorAppComponentProperty(view, "collection", 0);
        // monitorAppComponentProperty(view, "el.tagName", 0, {stealth: true});
        // monitorAppComponentProperty(view, "el.id", 0, {stealth: true});
        // monitorAppComponentProperty(view, "el.className", 0, {stealth: true});

        // Patcha i metodi del componente dell'app

        patchAppComponentTrigger(view, 'view');
        patchAppComponentEvents(view);

        // patchFunctionLater(view, "delegateEvents", function(originalFunction) { return function() {
        //     var events = arguments[0]; // hash <selector, callback>
        //     if (events === undefined) {
        //         // delegateEvents usa internamente this.events se viene chiamata senza
        //         // argomenti, non rendendo possibile la modifica dell'input,
        //         // per cui in questo caso anticipiamo il comportamento e usiamo this.events
        //         // come input.
        //         // (this.events può essere anche una funzione che restituisce l'hash)
        //         events = (typeof this.events == "function") ? this.events() : this.events;
        //     }

        //     // bisogna modificare al volo le callback in events
        //     // per poter tracciare quando vengono chiamate
        //     events = clone(events); // evita di modificare l'oggetto originale
        //     for (var eventType in events) {
        //         if (events.hasOwnProperty(eventType)) {
        //             // la callback può essere direttamente una funzione o il nome di una
        //             // funzione nella view
        //             var callback = events[eventType];
        //             if (typeof callback != "function") {
        //                 callback = this[callback];
        //             }
        //             if (!callback) {
        //                 // lascia la callback non valida invariata in modo che
        //                 // il metodo originale possa avvisare dell'errore
        //                 continue;
        //             }

        //             // callback valida, la modifica al volo
        //             // (ogni funzione ha la sua closure con i dati dell'evento)
        //             events[eventType] = (function(eventType, callback) {
        //                 return function(event) {
        //                     // event è l'evento jquery

        //                     addAppComponentAction(view, new AppComponentAction(
        //                         "dom-event", eventType, event, "jQuery Event"
        //                     ));

        //                     var result = callback.apply(this, arguments);
        //                     return result;
        //                 }
        //             })(eventType, callback);
        //         }
        //     }

        //     // modifica gli argomenti (non basta settare arguments[0] in quanto non funziona
        //     // nella strict mode)
        //     var argumentsArray = Array.prototype.slice.call(arguments);
        //     argumentsArray[0] = events;
        //     var result = originalFunction.apply(this, argumentsArray);

        //     return result;
        // }});

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
