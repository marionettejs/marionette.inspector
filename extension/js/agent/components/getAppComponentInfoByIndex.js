
this.getAppComponentInfoByIndex = _.bind(function(appComponentCategory, appComponentIndex) {
    var appComponentInfo = this.appComponentsInfo[appComponentCategory][appComponentIndex];
    return appComponentInfo;
}, this);
