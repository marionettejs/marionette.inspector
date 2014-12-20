function fib(n) {
  var i;
  var fib = [];

  fib[0] = 0;
  fib[1] = 1;
  for(i=2; i<=n; i++) {
      fib[i] = fib[i-2] + fib[i-1];
  }

  return fib[n];
}


describe('lazyWorker', function() {
  beforeEach(function() {
    window.startTestTime = new Date();
    this.worker = new window.LazyWorker();
    this.startTime = new Date();
  });

  describe('jobs added synchronously', function() {
    beforeEach(function(done) {
      this.job1 = sinon.stub();
      this.worker.push({
        context: {},
        callback: this.job1,
        args: []
      });

      this.job2 = sinon.stub();
      this.worker.push({
        context: {},
        callback: this.job2,
        args: []
      });

      this.worker.on('queue:empty', done);
    })

    it('it did some work', function() {
      expect(this.job1).to.be.calledOnce
      expect(this.job2).to.be.calledOnce
    });

    it('it started after some time', function() {
      this.stopTime = new Date();
      expect(this.stopTime - this.startTime).to.be.above(100);
    });
  })


  describe('jobs added asynchronously', function() {
    beforeEach(function(done) {
      window.setTimeout(function() {
        this.job1 = sinon.stub();
        this.worker.push({
          context: {},
          callback: this.job1,
          args: []
        });
      }.bind(this), 10)

      window.setTimeout(function() {
        this.job2 = sinon.stub();
        this.worker.push({
          context: {},
          callback: this.job2,
          args: []
        });
      }.bind(this), 80)

      this.worker.on('queue:empty', done);

      this.stopWorkSpy = sinon.stub();
      this.worker.on('work:stop', this.stopWorkSpy);

      this.worker.on('push', function() {
        this.lastPushTime = new Date();
      }, this);
    })

    it('it did some work', function() {
      expect(this.job1).to.be.calledOnce
      expect(this.job2).to.be.calledOnce
    });

    it('calls stop work', function() {
      expect(this.stopWorkSpy.callCount).to.be.eql(1);
    })

    it('waits more than deferTime to start', function() {
      this.stopTime = new Date();
      expect(this.stopTime - this.lastPushTime).to.be.above(this.worker.deferTime);
    });

    it('it started after some time', function() {
      this.stopTime = new Date();
      var totalTime = this.stopTime - this.startTime;
      console.log('slow jobs worker took', totalTime);
      expect(totalTime).to.be.above(150);
    });
  })

  describe('slow jobs added', function() {
    beforeEach(function(done) {

      this.job1 = sinon.stub();
      this.worker.push({
        context: this,
        callback: function() {fib(2000000); this.job1();},
        args: []
      });

      this.job2 = sinon.stub();
      this.worker.push({
        context: this,
        callback: function() {fib(2000000); this.job2();},
        args: []
      });

      this.worker.on('queue:empty', done);
      this.stopWorkSpy = sinon.stub();
      this.worker.on('work:stop', this.stopWorkSpy);
    })

    it('it did some work', function() {
      expect(this.job1).to.be.calledOnce
      expect(this.job2).to.be.calledOnce
    });

    it('calls stop work', function() {
      // called first time when starting the second job because the first took so long
      // called second time when looking for a third job and seeing it's empty
      // called third time...
      expect(this.stopWorkSpy.callCount).to.be.eql(3);
    })

    it('it started after some time', function() {
      this.stopTime = new Date();
      var totalTime = this.stopTime - this.startTime;
      console.log('slow jobs worker took', totalTime);
      expect(totalTime).to.be.above(250);
    });
  })
});