;(function(Agent){

  Agent.LazyWorker = function() {
    this.initTime = new Date();
    this.queue = [];
    this.startWork = _.debounce(this.startWork, this.deferTime);
    // this.logSize();
  };

  _.extend(Agent.LazyWorker.prototype, Backbone.Events, {

    // time to wait until starting work
    deferTime: 200,

    // time to work and potentially freeze the screen
    workTime: 80,

    jobId: 0,

    push: function(job) {
      // console.log('** callee', Agent.stackFrame(8));
      // console.log('push called', this.queue.length, new Date() - this.initTime);

      job.jobId = this.jobId++;
      this.queue.push(job);
      this.trigger('push');
      this.startWork();
    },

    startWork: function() {
      if (this.isWorking) {
        return;
      }

      this.trigger('work:start');
      // window.setTimeout(this.stopWork.bind(this), this.workTime);
      this.isWorking = true;
      this.startTime = new Date();
      var job;

      while (this.isWorking) {
        //console.log('working loop called', this.queue.length, new Date() - this.initTime);

        job = this.queue.shift();
        if (!job) {
          //console.log('queue is empty', new Date() - this.startTime)
          this.stopWork();
          this.trigger('queue:empty');
          return;
        }


        job.callback.apply(job.context, job.args);

        if (new Date() - this.startTime > this.workTime) {
          //console.log('time has elapsed', new Date() - this.startTime)
          this.stopWork();
          this.startWork();
          return;
        }
      }
    },

    stopWork: function() {
      if (!this.isWorking) {
        return;
      }

      //console.log('stop work called', new Date() - this.startTime);
      this.trigger('work:stop')
      this.isWorking = false;
    },

    logSize: function() {
      window.setInterval(function() {
        console.log('!!! queue size', Agent.lazyWorker.queue.length)
      }, 1000);
    }

  });

}(Agent));