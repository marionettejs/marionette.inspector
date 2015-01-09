;(function(Agent) {

  // @private
  Agent.AppComponentInfo = function() {

    var AppComponentInfo = function(category, index, component, actions) {

        this.component = component;

        // The category is a backbone class  ("View", "Model", "Collection", "Router")
        this.category = category;

        // used to identify the component by index
        this.index = index;

        // array of AppComponentAction
        this.actions = actions || [];
    };

    return AppComponentInfo;
  }();

  // Informazioni sui componenti dell'applicazione.
  // Hash <"componentCategory", [AppComponentInfo]>.
  // (Gli indici degli array sono quelli dei componenti.)
  // "View": [],
  // "Model": [],
  // "Collection": [],
  // "Router": []

  var appComponentsInfo = {};

  Agent.getAppComponentsInfo = function(appComponentCategory) {
    return appComponentsInfo[appComponentCategory];
  };

  // @private
  Agent.setAppComponentInfo = function(appComponent, appComponentInfo) {
      var appComponentCategory = appComponentInfo.category;
      var appComponentIndex = appComponentInfo.index;

      // salva l'appComponentInfo all'interno del componente e nell'hash pubblico apposito
      Agent.setHiddenProperty(appComponent, 'appComponentInfo', appComponentInfo);

      if (appComponentsInfo[appComponentCategory] === undefined) {
        appComponentsInfo[appComponentCategory] = [];
      }

      appComponentsInfo[appComponentCategory][appComponentIndex] = appComponentInfo;
  };

  // Restituisce l'oggetto di tipo AppComponentInfo con le informazioni sul componente dell'app passato
  // o undefined se l'oggetto passato non è un componente valido.
  Agent.getAppComponentInfo = function(appComponent) {
    return Agent.getHiddenProperty(appComponent, 'appComponentInfo');
  };

}(Agent));