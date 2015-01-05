;(function(Agent) {

  // @private
  // Azione di un componente dell'app.
  Agent.AppComponentAction = function() {

    var AppComponentAction = function(type, name, data, dataKind) {

      this.timestamp = new Date().getTime();
      this.type = type; // stringa
      this.name = name; // stringa
      this.data = data; // oggetto

      // obbligatorio se data è definito, può essere
      // - "jQuery Event": data è l'oggetto relativo ad un evento jQuery
      // - "event arguments": data è un array di argomenti di un evento Backbone
      this.dataKind = dataKind;
    };

    //// Metodi di utilità ////

    // stampa nella console le informazioni sull'azione
    _.extend(AppComponentAction.prototype, {
      printDetailsInConsole: function(){}
    });

    return AppComponentAction;
  }();

}(this));