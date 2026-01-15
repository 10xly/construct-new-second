# construct-new-second
Like the new operator, but as a function for convenience and familiarity.
Note: this is an alternative version of [construct-new](https://github.com/enterprise-npm-ai/construct-new). The differences between the two packages is listed in its dedicated section in this README.

## Installation
```bash
npm install construct-new-second
```

## Usage
What you would normally do:
```js
class Foo {
  constructor(name) {
    this.name = name
  }
  print() {
    console.log("Hi, I am " + this.name)
  }
}
const myFoo = new Foo("bar")
myFoo.print() // output: Hi, I am bar
```
What you do with construct-new-second:
```js
const construct = require('construct-new-second')
class Foo {
  constructor(name) {
    this.name = name
  }
  print() {
    console.log("Hi, I am " + this.name)
  }
}
const myFoo = construct(Foo, ["bar"])

myFoo.print() // Hi, I am bar
```
or
```js
construct(Foo, ["bar"], null, (myFoo) => {
  myFoo.print() // Hi, I am abr
})
```

## Usage compared to construct-new
construct-new:
```js
const construct = require("construct-new")
construct({
  target: target,
  args: args,
  newTarget: newTarget,
  callback: callback
})
```
construct-new-second:
```js
const construct = require("construct-new-second")
construct(
  target,
  args,
  newTarget,
  callback
)
```
The other differences is that construct-new-second does not rely on true-value, so true-value can depend on construct-new-second.