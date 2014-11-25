describe('inspectValue', function() {

  beforeEach(function() {
    window._knownTypes = {};
  })

  describe('primitives', function() {
    it('string', function() {
      expect(window.inspectValue('foo')).to.deep.equal({
        type: "type-string",
        inspect: "foo",
        cid: undefined,
        key: ""
      });
    });

    it('number', function() {
      expect(window.inspectValue(2)).to.deep.equal({
        type: "type-number",
        inspect: 2,
        cid: undefined,
        key: ""
      });
    });

    it('bool', function() {
      expect(window.inspectValue(true)).to.deep.equal({
        type: "type-boolean",
        inspect: true,
        cid: undefined,
        key: ""
      });
    });
  });

  describe('arrays', function() {
    it('[]', function() {
      expect(window.inspectValue([])).to.deep.equal({
        type: "type-array",
        inspect: "[]",
        cid: undefined,
        key: ""
      });
    });

    it('[2]', function() {
      expect(window.inspectValue([2])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2 ]",
        cid: undefined,
        key: ""
      });
    });

    it('[2, 3]', function() {
      expect(window.inspectValue([2,3])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]",
        cid: undefined,
        key: ""
      });
    });

    it('[2, 3, 4]', function() {
      expect(window.inspectValue([2,3,4])).to.deep.equal({
        type: "type-array",
        inspect: "[ 2, ... ]",
        cid: undefined,
        key: ""
      });
    });
  });

  describe('objects', function() {
    it('{a: 2}', function() {
      expect(window.inspectValue({a: 2})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: 2 }",
        cid: undefined,
        key: ""
      });
    })

    it('{a: "foo"}', function() {
      expect(window.inspectValue({a: 'foo'})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: foo }",
        cid: undefined,
        key: ""
      });
    });
  })

  describe('functions', function() {
    it('anonymous fnc', function() {
      expect(window.inspectValue(function() {2+2})).to.deep.equal({
        type: "type-function",
        inspect: "function() {",
        cid: undefined,
        key: ""
      });
    });

    it('anonymous fnc in object', function() {
      var model = new window.patchedBackbone.Model();

      expect(window.inspectValue(model.trigger, model)).to.deep.equal({
        type: "type-function",
        inspect: "function() {",
        cid: undefined,
        key: 'trigger'
      });
    })
  })

  describe('known types', function() {
    beforeEach(function() {
      sinon.stub(_, 'uniqueId', function() {return 'c1'})
    });

    afterEach(function() {
      _.uniqueId.restore();
    })

    it('Backbone.Model', function() {
      expect(window.inspectValue(new window.patchedBackbone.Model)).to.deep.equal({
        type: "type-backbone-model",
        inspect: "<Backbone.Model c1>",
        cid: 'c1',
        key: ''
      });
    });

    it('{a: Backbone.Model}', function() {
      expect(window.inspectValue({a: new window.patchedBackbone.Model})).to.deep.equal({
        type: "type-object",
        inspect: "{ a: <Backbone.Model c1> }",
        cid: undefined,
        key: ""
      });
    });
  })
})
