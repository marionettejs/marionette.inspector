;(function(Agent) {

  Agent.serializeElement = function (element, uiName, recurse) {
      var obj = {};
      var $el;

      //detect a jQuery object
      //todo: support zepto
      if (_.isObject(element) && !(element instanceof HTMLElement) && element.jquery) {
        $el = element
      } else {
        $el = nanodom(element)
      }

      var el = $el && $el[0];

      if (!el) {
        return {};
      }

      obj.tagName = el.tagName;

      obj.attributes = _.map(el.attributes, function(v) {
        return {
          name: v.name,
          value: v.value
        };
      });

      if (recurse) {
        obj.children = _.map(el.children, function(child){
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