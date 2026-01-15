const getIntrinsic = require("es-intrinsic-cache")
const err = require("@errorstream/err")
const noop = require("n0p3-es2015-cjs")
const isNil = require("is_null_or_undefined")
const stubArray = require("lodash.stubarray")
const isConstructable = require("is-constructable").isConstructable
const not = require("es-logical-not-operator")
const isArrayLike = require("is-array-like")
const isFunction = require("@is-(unknown)/is-function")
const t = require("@andreaspizsa/true")
const ReflectConstruct = getIntrinsic("%Reflect.construct%", t)
const isNonpresent = require("is-nonpresent")
const $apply = require("function.apply-x")
const uncurry = require("uncurry-x")
const uncurriedApply = uncurry($apply)
const create = require("object.create-intrinsic-ai")

function construct(target, args, newTarget, callback) {
  if (isNil(target)) {
    return err("Target cannot be null when constructing a new instance of an object.")
  }
  if (isNil(args)) {
    args = stubArray()
  }
  if (isNil(newTarget)) {
    newTarget = target
  }
  if (isNil(callback)) {
    callback = noop
  }
  if (not(isConstructable(target))) {
    return err("Target must be constructable when constructing a new instance of an object.")
  }
  if (not(isConstructable(newTarget))) {
    return err("newTarget must be constructable when constructing a new instance of an object.")
  }
  if (not(isArrayLike(args))) {
    return err("Arguments must be array-like.")
  }
  if (not(isFunction(callback))) {
    return err("If specified, the callback should be a function when passed into construct")
  }
  let result
  if (not(isNonpresent(ReflectConstruct))) {
    result = ReflectConstruct(target, args, newTarget)
  } else {
    result = uncurriedApply(target, create(target.prototype), args)
  }

  callback(result)
  return result
}

module.exports = construct