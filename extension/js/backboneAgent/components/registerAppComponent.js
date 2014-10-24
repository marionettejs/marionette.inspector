
// @private
// Aggiunge il componente dell'app passato a quelli conosciuti creando l'oggetto con le info
// e inviando un report all'esterno per informare il resto del mondo.
// Restituisce l'indice del componente.
var registerAppComponent = bind(function(appComponentCategory, appComponent) {
    // calcola l'indice del nuovo componente
    var appComponentIndex = ++lastAppComponentsIndex[appComponentCategory];

    setAppComponentInfo(appComponent, new AppComponentInfo(
      appComponentCategory,
      appComponentIndex,
      appComponent
    ));

    // invia un report riguardante il nuovo componente dell'app
    var reportName = appComponentCategory+":new";
    sendAppComponentReport(reportName, {
      componentIndex: appComponentIndex,
      type: 'new',
      name: appComponentCategory
    });

    // debug.log("New " + appComponentCategory, appComponent);

    return appComponentIndex;
}, this);
