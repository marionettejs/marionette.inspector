define(['util/sortAttributes'], function(sortAttributes) {
  return function(data, infoItems, instanceProperties) {
    var properties = _.omit(data.properties, infoItems, instanceProperties);
    var ancestorInfo = data.ancestorInfo;

    var ancestors = [];
    _.each(ancestorInfo, function(info) {
      var props = _.pick(properties, info.keys);
      var sortedProps = sortAttributes(props);
      ancestors.push({
        properties: sortedProps,
        name: info.name || 'Class Properties',
        path: info.path
      });
    });

    ancestors[0].name = 'Properties';

    return ancestors;
  };
});
