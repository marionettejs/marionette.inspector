;(function(agent) {

  agent.getAppComponentByTypeAndCid = function(type, cid) {
    // console.log('!!! inside inspect Function', data);
    var typeRegistry = agent.appComponentsInfo[data.type];

    // console.log('!!! just got the type registry', typeRegistry)
    var appComponentInfo = agent._.find(typeRegistry, function(appComponentInfo) {
      return appComponentInfo.component.cid == data.cid;
    });

    // console.log('!!! just found an ACI', appComponentInfo, data.cid)

    // if we find an app component info object, we'll grab the component
    // that it holds and use that!
    if (appComponentInfo) {
      object = appComponentInfo.component;
    } else {
      return;
    }

    return object
  }
}(this));

