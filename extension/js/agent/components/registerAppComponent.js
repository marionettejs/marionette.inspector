
// @private
// Aggiunge il componente dell'app passato a quelli conosciuti creando l'oggetto con le info
// e inviando un report all'esterno per informare il resto del mondo.
// Restituisce l'indice del componente.
var registerAppComponent = _.bind(function(appComponentCategory, appComponent, componentData) {
    // calcola l'indice del nuovo componente
    if (lastAppComponentsIndex[appComponentCategory] == null) {
      lastAppComponentsIndex[appComponentCategory] = -1;
    }
    var appComponentIndex = ++lastAppComponentsIndex[appComponentCategory];

    setAppComponentInfo(appComponent, new AppComponentInfo(
      appComponentCategory,
      appComponentIndex,
      appComponent
    ));


    componentData = componentData || {};

    // invia un report riguardante il nuovo componente dell'app
    var reportName = appComponentCategory+":new";
    var reportData = {
      componentIndex: appComponentIndex,
      type: 'new',
      name: appComponentCategory,
      data: componentData
    };

    sendAppComponentReport(reportName, reportData);

    debug.log("registerAppComponent " + reportName);

    return appComponentIndex;
}, this);

this.registerAppComponent = registerAppComponent;
