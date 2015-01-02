
// Restituisce l'oggetto di tipo AppComponentInfo con le informazioni sul componente dell'app passato
// o undefined se l'oggetto passato non è un componente valido.
this.getAppComponentInfo = _.bind(function(appComponent) {
    return this.getHiddenProperty(appComponent, "appComponentInfo");
}, this);