;(function(Agent) {

  var QueuePostMessages = function() {
    this.queue = [];

    _.bindAll(this, 'sendBatch');
    this.sendBatch = _.debounce(this.sendBatch, this._debounceTime);
  };

  _.extend(QueuePostMessages.prototype, {

    _debounceTime: 100,

    push: function(message, options) {
      message.target = 'page'; // il messaggio riguarda la pagina

      // console.log('!!! ', message.name, this.queue.length, new Date().getTime());
      this.queue.push(message);

      if (this.queue.length >= 1000 || options.immediate) {
        this.sendBatchImmediate();
      } else {
        this.sendBatch();
      }
    },

    sendBatch: function() {
      this.send();
    },

    sendBatchImmediate: function() {
      Agent.postMessage(_.clone(this.queue));
      this.queue = [];
    },

    send: function() {
      // console.log('!!!! sending batch message')
      debug.log('postMessage sent ' + this.queue.length + ' messages.');
      Agent.lazyWorker.push({
        context: Agent,
        args: [_.clone(this.queue)],
        callback: Agent.postMessage
      });

      this.queue = [];
    }
  });


  var queuePostMessages = new QueuePostMessages();

  // @private
  Agent.sendMessage = function(message, options) {
    options = options || {};
    queuePostMessages.push(message, options);
  };

  Agent.postMessage = function(data) {
    window.postMessage(data, '*');
  }

}(Agent));
