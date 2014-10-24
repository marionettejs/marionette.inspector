// @private
var AppComponentInfo = function(category, index, component, actions) {

    this.component = component;

    // The category is a backbone class  ("View", "Model", "Collection", "Router")
    this.category = category;

    // used to identify the component by index
    this.index = index;

    // array of AppComponentAction
    this.actions = actions || [];
};
