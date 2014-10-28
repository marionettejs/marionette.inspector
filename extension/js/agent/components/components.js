// @private
// All'atto dell'istanziazione di un componente, l'agent gli assegna
// un indice che lo identifica all'interno dei vari array
// riguardanti i componenti di quella categoria.
// Tale indice viene calcolato incrementando quello dell'ultimo componente
// della propria categoria.
var lastAppComponentsIndex = {
    "View": -1,
    "Model": -1,
    "Collection": -1,
    "Router": -1
};

// Informazioni sui componenti dell'applicazione.
// Hash <"componentCategory", [AppComponentInfo]>.
// (Gli indici degli array sono quelli dei componenti.)
this.appComponentsInfo = {
    "View": [],
    "Model": [],
    "Collection": [],
    "Router": []
};