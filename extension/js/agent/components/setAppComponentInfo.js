

// @private
var setAppComponentInfo = _.bind(function(appComponent, appComponentInfo) {
    var appComponentCategory = appComponentInfo.category;
    var appComponentIndex = appComponentInfo.index;

    // salva l'appComponentInfo all'interno del componente e nell'hash pubblico apposito
    setHiddenProperty(appComponent, "appComponentInfo", appComponentInfo);
    if (this.appComponentsInfo[appComponentCategory] == null) {
      this.appComponentsInfo[appComponentCategory] = [];
    }
    this.appComponentsInfo[appComponentCategory][appComponentIndex] = appComponentInfo;
}, this);
