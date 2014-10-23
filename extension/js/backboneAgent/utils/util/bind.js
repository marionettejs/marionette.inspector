// @private
// Imposta il this nella funzione func pari all'oggetto scope.
var bind = function(func, scope) {
    return function() {
        return func.apply(scope, arguments);
    };
};
