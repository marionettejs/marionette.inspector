;(function(Agent) {

  // @private
  // All'atto dell'istanziazione di un componente, l'agent gli assegna
  // un indice che lo identifica all'interno dei vari array
  // riguardanti i componenti di quella categoria.
  // Tale indice viene calcolato incrementando quello dell'ultimo componente
  // della propria categoria.
  var lastAppComponentsIndex = {};

  // @private
  // Aggiunge il componente dell'app passato a quelli conosciuti creando l'oggetto con le info
  // e inviando un report all'esterno per informare il resto del mondo.
  // Restituisce l'indice del componente.
  Agent.registerAppComponent = function(appComponentCategory, appComponent, componentData) {
      // calcola l'indice del nuovo componente
      if (lastAppComponentsIndex[appComponentCategory] === undefined) {
        lastAppComponentsIndex[appComponentCategory] = -1;
      }
      var appComponentIndex = ++lastAppComponentsIndex[appComponentCategory];

      Agent.setAppComponentInfo(appComponent, new Agent.AppComponentInfo(
        appComponentCategory,
        appComponentIndex,
        appComponent
      ));

      componentData = componentData || {};

      // invia un report riguardante il nuovo componente dell'app
      var reportName = appComponentCategory + ':new';
      var reportData = {
        componentIndex: appComponentIndex,
        type: 'new',
        name: appComponentCategory,
        data: componentData
      };

      Agent.sendAppComponentReport(reportName, reportData);

      debug.log('registerAppComponent ' + reportName);

      return appComponentIndex;
  };

}(this));