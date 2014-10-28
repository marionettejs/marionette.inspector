
// Restituisce l'info della vista a cui appartiene l'elemento html passato, o undefined se non esiste.
// L'elemento appartiene alla vista se questo combacia perfettamente con la sua proprietà el, o
// se questa è l'ascendente più vicino rispetto a tutte le altre viste.
this.getAppViewInfoFromElement = bind(function(pageElement) {
    // funzione che controlla se l'elemento html target è un ascendente dell'elemento html of
    var isAscendant = function(target, of) {
        if (!of) return false;

        var ofParent = of.parentNode;
        if (target === ofParent) return true;
        return isAscendant(target, ofParent);
    };

    // cerca il miglior candidato
    var candidateViewInfo;
    var viewsIndexes = this.getAppComponentsIndexes("View");
    for (var i=0,l=viewsIndexes.length; i<l; i++) {
        var currentViewInfo = this.getAppComponentInfoByIndex("View", viewsIndexes[i]);
        var currentView = currentViewInfo.component;

        if (currentView.el === pageElement) {
            // candidato perfetto trovato
            candidateViewInfo = currentViewInfo;
            break;
        }
        // l'el di currentView è un ascendente di pageElement ed è un discendente del miglior
        // candidato trovato finora?
        var candidateView = candidateViewInfo? candidateViewInfo.component : undefined;
        var isBetterCandidate = isAscendant(currentView.el, pageElement) &&
                               (!candidateView || isAscendant(candidateView.el, currentView.el));
        if (isBetterCandidate) {
            // candidato migliore trovato
            candidateViewInfo = currentViewInfo;
        }
    }
    return candidateViewInfo;
}, this);