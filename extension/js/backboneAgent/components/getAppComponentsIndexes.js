
// Restituisce un array con gli indici dei componenti dell'applicazione
// della categoria specificata che sono presenti nell'app.
this.getAppComponentsIndexes = bind(function(appComponentCategory) {
    var appComponentsInfo = this.appComponentsInfo[appComponentCategory];

    var appComponentsIndexes = [];
    for (var appComponentIndex in appComponentsInfo) {
        if (appComponentsInfo.hasOwnProperty(appComponentIndex)) {
            appComponentsIndexes.push(appComponentIndex);
        }
    }
    return appComponentsIndexes;
}, this);