define([
  'client'
], function(client) {

  /*
    clientInspect is an awesome function that inspects an object in the
    context of the agent.

    We inspect three types of things: functions, elements, and properties.
    For functions we find, we can show the function in the source panel.
    For elements we find, we can show the element in the sources panel.
    For everything else, we can print them in the console.

    clientInspect works by first finding the object who's property
    we're going to inspect in the appComponentInfo registry. Then,
    getting the property and showing it.

    @param cid - object cid we want to inspect
    @param path - path to the function we want to inspect
    @param type - type of object we're inspecting (Model or View)
  */

  return function(data) {
    client.exec(function(data) {

      var object = this.getAppComponentByTypeAndCid(data.type, data.cid);
      var prop = this.objectPath(object, data.path);

      // console.log('!!! data', data);
      // console.log('!!! found prop', data.path, prop)

      // if it's a jquery object, get the first element
      if (prop instanceof jQuery) {
        prop = prop[0];
      }

      // console.log('found prop', prop);

      // inspect a function
      if (this._.isFunction(prop)) {
        if (prop.toString().match(/native code/)) {
          window.temp = prop;
          console.log('Mn: temp = ', prop);
        } else {
          inspect(prop);
        }
      }

      // inspect a dom element
      else if (prop instanceof Node) {
        inspect(prop);
      }

      // print any old property that's clicked
      else {
        console.log('Mn: ', prop);
      }
    }, [data])
  }
})