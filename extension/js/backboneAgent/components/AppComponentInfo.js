// @private
var AppComponentInfo = function(category, index, component, actions) {

    // nome del componente Backbone di cui questo componente dell'app è un discendente.
    // I valori validi sono "View", "Model", "Collection", "Router"
    this.category = category;
    // usato come identificatore tra tutti i componenti dell'app della sua categoria
    this.index = index;

    this.component = component; // oggetto
    this.actions = actions || []; // array di oggetti AppComponentAction
};