;(function(Agent) {

  Agent.stackFrame = function (i) {
    try {0()} catch (e) {
      var stack = e.stack;
      stack = stack.substr(stack.indexOf('\n') + 1);
    }

    if (!stack) return;

    var lines = stack.split(/\n/);
    var line = lines[i - 1];
    if (!line) return;

    return line.trim().split(/\(/)[0];
  }

}(this));
