
// @private
// Restituisce l'indice dell'azione aggiunta.
var addAppComponentAction = bind(function(appComponent, appComponentAction) {
    var appComponentInfo = this.getAppComponentInfo(appComponent);

    if (!appComponentInfo) {
        debug.log('addAppComponentAction could not find action');
        return;
    }

    appComponentInfo.actions.push(appComponentAction);
    var actionIndex = appComponentInfo.actions.length-1;

    // invia un report riguardante la nuova azione
    var reportName = appComponentInfo.category+":"+appComponentInfo.index+":action";
    sendAppComponentReport(reportName, {
        componentActionIndex: actionIndex,
        type: appComponentAction.type,
        name: appComponentAction.name

    });
    //debug.log("New action: ", appComponentAction);

    return actionIndex;
}, this);
