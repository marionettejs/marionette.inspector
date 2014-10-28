
// @private
// Patcha il metodo sync del componente dell'app (presente in modelli e collezioni).
var patchAppComponentSync = bind(function(appComponent) {
    patchFunctionLater(appComponent, "sync", function(originalFunction) { return function() {

        var method = arguments[0]; // es. "create", "read", etc.

        var syncCompleted = function(isSuccess) {
            var syncStatus = isSuccess? "success" : "failure";
            var actionName = method + " ("+syncStatus+")"; // es. "fetch (failure)"

            addAppComponentAction(appComponent, new AppComponentAction("Sync", actionName));
        };

        // arguments[2] è un hash con le opzioni
        // lo modifica al volo per essere informato sull'esito della sync
        var argumentsArray = Array.prototype.slice.call(arguments);
        if (argumentsArray[2] === undefined) { // il parametro è opzionale
            argumentsArray[2] = {};
        }
        patchFunction(argumentsArray[2], "success", function(originalFunction) { return function() {
            syncCompleted(true);
            if (originalFunction) { // la proprietà è opzionale
                return originalFunction.apply(this, arguments);
            }
        };});
        patchFunction(argumentsArray[2], "failure", function(originalFunction) { return function() {
            syncCompleted(false);
            if (originalFunction) { // la proprietà è opzionale
                return originalFunction.apply(this, arguments);
            }
        };});
        var result = originalFunction.apply(this, argumentsArray);
        return result;
    };});
}, this);