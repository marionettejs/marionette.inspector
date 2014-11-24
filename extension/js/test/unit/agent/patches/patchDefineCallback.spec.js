describe("patchDefineCallback", function () {
  beforeEach(function () {
    window.defineCallbacks = {};
    window.__agent = { defineCallbacks: window.defineCallbacks };

    this.originalCallback = function (a0, a1, a2, a3, a4) {};
    this.module = { myModule: true };
    this.newCallback = this.sinon.stub().returns(this.module);
    this.patchedCallback = window.patchDefineCallback(this.originalCallback, this.newCallback);
  });

  it("returns a function with the same arity as the original callback", function () {
    expect(this.patchedCallback).to.have.length(5);
  });

  it("adds a defineCallback to the global", function () {
    expect(_.keys(window.defineCallbacks)).to.have.length(1);
  });

  describe("calling the patchedCallback", function () {
    beforeEach(function () {
      this.context = {};
      this.callbackArgs = ['a0', 'a1', 'a2', 'a3', 'a4'];
      this.returnedModule = this.patchedCallback.apply(this.context, this.callbackArgs);
    });

    it("calls the newCallback with the same arguments", function () {
      expect(this.newCallback).to.have.been.calledOnce
        .and.calledOn(this.context)
        .and.calledWithMatch(this.callbackArgs);
    });

    it("returns the result of newCallback", function () {
      expect(this.returnedModule).to.equal(this.module);
    });

    it("removes the defineCallback from the global", function () {
      expect(_.keys(window.defineCallbacks)).to.be.empty;
    });
  });
});