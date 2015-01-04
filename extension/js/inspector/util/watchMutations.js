define([], function() {
  return function(target) {

    if (!target) {
      return;
    }

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log('!!!', mutation.type, mutation.addedNodes[0]);
      });
    });

    // configuration of the observer:
    var config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };

    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  }

});