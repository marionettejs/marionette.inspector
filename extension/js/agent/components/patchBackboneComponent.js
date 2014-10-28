// @private
// instancePatcher è una funzione che viene chiamata ad ogni istanziazione del componente Backbone
// specificato (e dei suoi sottotipi), passandogli la nuova istanza.
// I componenti Backbone validi sono Backbone.View, Backbone.Model, Backbone.Collection e Backbone.Router
// N.B: suppone che il componente backbone sia stato settato solo inizialmente.
var patchBackboneComponent = bind(function(BackboneComponent, instancePatcher) {
    // Patcha la initialize del componente (e dei suoi sottotipi) per intercettare
    // le istanze create, il meccanismo quindi funziona se i sottotipi non definiscono
    // costruttori custom che non chiamano la initialize.

    var patchInitialize = function(originalInitialize) {
        return function() {
            // Patcha l'istanza se non è già stato fatto
            // (se ad es. l'istanza chiama l'initialize definita nel padre, evita
            // di patcharla due volte)
            if (!getHiddenProperty(this, "isInstancePatched")) {
                instancePatcher(this);
                setHiddenProperty(this, "isInstancePatched", true);
            }

            if (typeof originalInitialize === "function") {
                return originalInitialize.apply(this, arguments);
            }
        };
    };

    // i set/get della initialize vengono modificati in modo da patchare al volo eventuali
    // override della proprietà da parte dei sottotipi e in modo da restituire tale
    // proprietà patchata; per questo il metodo di extend usato
    // deve mantenere tali getter and setter.

    // la proprietà sarà ereditata anche dai sottotipi e finirà nelle varie istanze,
    // contiene la versione patchata della initialize
    var patchedInitialize = patchInitialize(BackboneComponent.prototype.initialize);
    setHiddenProperty(BackboneComponent.prototype, "patchedInitialize", patchedInitialize);


    setProperty(BackboneComponent.prototype, "initialize", {
        get: function() {
            return getHiddenProperty(this, "patchedInitialize");
        },

        set: function(newInitialize) {
            setHiddenProperty(this, "patchedInitialize", patchInitialize(newInitialize));
        }
    });
}, this);