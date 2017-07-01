;(function(Agent) {
  Agent.observeChanges = function() {
    if(!Agent) return

    var total = WatchJS.lengthsubjects.length;
    var increment = 500;

    if (total === 0) {
        return;
    }

    if (total < increment) {
        Agent.lazyWorker.push({
          context: this,
          args: [0, total],
          callback: WatchJS.loop
        });
    } else {
        // Do the first n thousand loops
        // if there are 15633 tasks do them in chunks 0-999, 1000-1999
        var n = Math.ceil(total / increment);
        for (var i = 0; i < n; i++) {
           Agent.lazyWorker.push({
             context: this,
             args: [i*increment, (i+1)*increment-1],
             callback: WatchJS.loop
           });
        }

      // do the remaining tasks now
      // if there are 15,633 task, we've already done
      // the first 14999, now we'll 1500 - 1633
      var remainder = total % increment;
      Agent.lazyWorker.push({
        context: this,
        args: [n*increment, n*increment+remainder],
        callback: WatchJS.loop
      });

    }
  }
}(Agent));