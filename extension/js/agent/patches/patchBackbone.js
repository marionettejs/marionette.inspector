var patchBackbone = function(callback) {
  return onObjectAndPropertiesSetted(
    window,
    'Backbone', ['View', 'Model', 'Router', 'Wreqr', 'Collection', '$'],
    callback
  );
}

