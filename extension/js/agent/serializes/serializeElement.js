;(function(Agent) {

  Agent.serializeElement = function (element, uiName, recurse) {
      var $el = $(element);

      var obj = {};

      if (_.isUndefined($el[0])) {
        return {};
      }

      obj.tagName = $el[0].tagName;

      obj.attributes = _.map($el[0].attributes, function(v,i) {
        return {
          name: v.name,
          value: v.value
        };
      });

      if (recurse) {
        obj.children = _.map($el.children(), function(child, childName){
          // the element does not have a name because it's a child
          // Agent.serializeElement(child, name, true);
          return Agent.serializeElement(child, '', true);
        });
      }

      return {
        name: uiName,
        value: obj,
        type: 'type-element'
      };
  };

}(Agent));