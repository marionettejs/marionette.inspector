
var QueuePostMessages = function() {
  this.queue = [];

  _.bindAll(this, 'sendBatch');
  this.sendBatch = _.debounce(this.sendBatch, this._debounceTime);
}

_.extend(QueuePostMessages.prototype, {

  _debounceTime: 100,

  push: function(message) {
    message.target = "page"; // il messaggio riguarda la pagina

    this.queue.push(message);
    this.sendBatch();
  },

  sendBatch: function() {
    window.postMessage(this.queue, "*");
    this.queue = [];
  }

});


var queuePostMessages = new QueuePostMessages();

// @private
var sendMessage = function(message) {
  queuePostMessages.push(message)
};
