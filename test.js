const expect = require("chai").expect
const construct = require("./index")

describe("construct", () => {
  const StubConstructor = function (val) {
    this.val = val
  }

  it("should throw or return an error if target is null", () => {
    const call = () => construct(null)
    expect(call).to.throw("Target cannot be null when constructing a new instance of an object.")
  })

  it("should successfully construct an object with valid target and args", () => {
    const args = ["test-value"]
    const result = construct(StubConstructor, args)
    
    expect(result).to.be.an.instanceof(StubConstructor)
    expect(result.val).to.equal("test-value")
  })

  it("should use stubArray if args are null", () => {
    const result = construct(StubConstructor, null)
    expect(result).to.be.an.instanceof(StubConstructor)
    expect(result.val).to.be.undefined
  })

  it("should execute the callback with the resulting instance", (done) => {
    const callback = (instance) => {
      expect(instance).to.be.an.instanceof(StubConstructor)
      done()
    }
    construct(StubConstructor, [], null, callback)
  })

  it("should return an error if target is not constructable", () => {
    const call = () => construct({}, [])
    expect(call).to.throw("Target must be constructable when constructing a new instance of an object.")
  })

  it("should return an error if newTarget is not constructable", () => {
    const call = () => construct(StubConstructor, [], {})
    expect(call).to.throw("newTarget must be constructable when constructing a new instance of an object.")
  })

  it("should return an error if args are not array-like", () => {
    const call = () => construct(StubConstructor, 123)
    expect(call).to.throw("Arguments must be array-like.")
  })

  it("should return an error if callback is provided but not a function", () => {
    const call = () => construct(StubConstructor, [], StubConstructor, "not-a-function")
    expect(call).to.throw("If specified, the callback should be a function when passed into construct")
  })

  it("should support custom newTarget (Reflect.construct behavior)", () => {
    const Target = function () {}
    const NewTarget = function () {}
    NewTarget.prototype.customMethod = () => "found"
    
    const result = construct(Target, [], NewTarget)
    
    expect(result).to.be.an.instanceof(NewTarget)
  })
})