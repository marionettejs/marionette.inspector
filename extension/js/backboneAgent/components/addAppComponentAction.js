
// @private
// Restituisce l'indice dell'azione aggiunta.
var addAppComponentAction = bind(function(appComponent, appComponentAction) {
    var appComponentInfo = this.getAppComponentInfo(appComponent);

    appComponentInfo.actions.push(appComponentAction);
    var actionIndex = appComponentInfo.actions.length-1;

    // invia un report riguardante la nuova azione
    sendAppComponentReport(appComponentInfo.category+":"+appComponentInfo.index+":action", {
        componentActionIndex: actionIndex
    });
    //debug.log("New action: ", appComponentAction);

    return actionIndex;
}, this);