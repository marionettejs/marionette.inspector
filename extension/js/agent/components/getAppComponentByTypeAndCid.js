;(function(agent) {

  agent.getAppComponentByTypeAndCid = function(type, cid) {
    console.log('!!! inside inspect Function', type, cid);
    var typeRegistry = agent.appComponentsInfo[type];
    // console.log('!!! just got the type registry', typeRegistry)

    var appComponentInfo = agent._.find(typeRegistry, function(appComponentInfo) {
      var component = appComponentInfo.component;
      var componentCid = component.cid || component.__marionette_inspector__cid;

      return  cid == componentCid;
    });

    // console.log('!!! just found an ACI', appComponentInfo);
    // console.log('Looking for cid ', cid, 'found cid ', appComponentInfo.component.cid);

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

