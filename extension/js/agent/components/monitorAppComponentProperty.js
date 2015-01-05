// *** Note this function is not current in use or in core

// @private
// Si mette in ascolto sui cambiamenti della proprietà e invia un report all'esterno quando accade.
// Nota: se la proprietà inizialmente ha già un valore diverso da undefined, viene inviato subito
// un report.
// recursionLevel è un intero che specifica il livello di ricorsione a cui arrivare, ad es.
// 0 è "no ricorsione", 1 è "analizza anche le proprietà di property" e così via.
// N.B: non specificare recursionLevel equivale a dire "ricorsione completa",
// ma attenzione a non usarla per quegli oggetti in cui potrebbero esserci cicli o si incapperà
// in un loop infinito.
// property may also be of the form "prop1.prop2...", stating the path to follow to reach the
// sub-property to monitor.
// Possible options:
// - stealth: if true then uses the stealth on setted function to monitor for changes, but this
//   will cause the recursionLevel to be 0 since is not supported by the stealth monitoring.
var monitorAppComponentProperty = _.bind(function(appComponent, property, recursionLevel, options) {
    // handler per il cambiamento della proprietà
    var propertyChanged = bind(function() {
        // invia un report riguardante il cambiamento della proprietà
        var appComponentInfo = this.getAppComponentInfo(appComponent);

        var reportName = appComponentInfo.category + ":property:change";
        sendAppComponentReport(reportName, {
            componentProperty: property,
            type: 'change'
        });

        // debug.log("Property " + property + " of a " + appComponentInfo.category + " has changed: ", appComponent[property]);
    }, this);

    options = options || {};
    var onSettedFunc = options.stealth? stealthOnSetted : onSettedDeep;
    var stopOnSettedFunc = options.stealth? stopStealthOnSetted : stopOnSetted;
    var watchers = [];

    var monitorFragment = function(object, propertyFragments, index) {
        var currentProperty = propertyFragments[index];
        var currentRecursionLevel = (index == propertyFragments.length-1) ? recursionLevel : 0; // used only in last fragment
        var onFragmentChange = function() {
            // TODO: remove old sub setters (if any)
            if (index == propertyFragments.length - 1) {
                // the final target has changed
                propertyChanged();
            } else if (_.isObject(object[currentProperty])) {
                // remove the watchers of the old object and of its subproperties
                for (var i=index; i<propertyFragments.length; i++) {
                    if (watchers[i]) stopOnSettedFunc(watchers[i]);
                }
                // monitor the next fragment
                monitorFragment(object[currentProperty], propertyFragments, index+1);
            }
        }
        if (object[currentProperty] !== undefined) { onFragmentChange(); }
        // watch current fragment
        watchers[index] = onSettedFunc(object, currentProperty, onFragmentChange, recursionLevel);
    }
    monitorFragment(appComponent, property.split('.'), 0);
}, this);
