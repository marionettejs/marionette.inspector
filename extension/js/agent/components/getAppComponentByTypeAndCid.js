;(function(Agent) {

  Agent.getAppComponentByTypeAndCid = function(type, cid) {
    // console.log('!!! inside inspect Function', type, cid);
    var typeRegistry = Agent.getAppComponentsInfo(type);
    // console.log('!!! just got the appComponentCategory registry', typeRegistry)

    var component, componentCid;

    var appComponentInfo = _.find(typeRegistry, function(appComponentInfo) {
      var component = appComponentInfo.component;
      var componentCid = component.cid || component.__marionette_inspector__cid;

      return  cid === componentCid;
    });

    // console.log('!!! just found an ACI', appComponentInfo);
    // console.log('Looking for cid ', cid, 'found cid ', appComponentInfo.component.cid);

    // if we find an app component info object, we'll grab the component
    // that it holds and use that!
    if (appComponentInfo) {
      return appComponentInfo.component;
    }
  };

}(this));