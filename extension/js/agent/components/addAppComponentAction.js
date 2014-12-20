
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
    var reportName = appComponentInfo.category+":"+appComponentAction.type;
    var reportData = {
        componentActionIndex: actionIndex,
        type: appComponentAction.type,
        name: appComponentAction.name,
        data: _.extend(appComponentAction.data || {}, {
            cid: appComponent.cid, // might not exist
        })
    };

    sendAppComponentReport(reportName, reportData);
    // debug.log("action: ", reportName);

    return actionIndex;
}, this);

this.addAppComponentAction = addAppComponentAction;