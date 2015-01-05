;(function(Agent) {

  // funzione che controlla se l'elemento html target è un ascendente dell'elemento html of
  var isAscendant = function(target, of) {
      if (!of) return false;

      var ofParent = of.parentNode;
      if (target === ofParent) return true;
      return isAscendant(target, ofParent);
  };

  // Restituisce l'info della vista a cui appartiene l'elemento html passato, o undefined se non esiste.
  // L'elemento appartiene alla vista se questo combacia perfettamente con la sua proprietà el, o
  // se questa è l'ascendente più vicino rispetto a tutte le altre viste.
  Agent.getAppViewInfoFromElement = function(pageElement) {

      var viewRegistry = Agent.getAppComponentsInfo('View');

      // cerca il miglior candidato
      var candidateViewInfo;

      var foundViewInfo = _.find(viewRegistry, function(currentViewInfo){
          var currentView = currentViewInfo.component;

          if (currentView.el === pageElement) {
              // candidato perfetto trovato
              return currentViewInfo;
          }

          // is this view in the pageElement
          if(isAscendant(currentView.el, pageElement)){
            // l'el di currentView è un ascendente di pageElement ed è un discendente del miglior
            // candidato trovato finora?
            var candidateView = candidateViewInfo? candidateViewInfo.component : undefined;

            // is the view better than a previous candidate?
            if (!candidateView || isAscendant(candidateView.el, currentView.el)) {
                // candidato migliore trovato
                candidateViewInfo = currentViewInfo;
            }
          }
      });

      return foundViewInfo || candidateViewInfo;
  };

}(this));