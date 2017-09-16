var x = require('xtend')
var assert = require('nanoassert')

var cache = {}
var components = {}

module.exports = box

function box (name, key) {
  assert.ok(typeof name === 'string' || typeof name === 'number', 'component-box: name should be type string or number')
  assert.ok(components[name], 'component-box: no component handler found for [' + name + ']')

  if (key && cache[key]) {
    return cache[key]
  } else if (key) {
    cache[key] = components[name]()
    return cache[key]
  } else if (key === false) {
    return components[name]() 
  } else if (name && cache[name]) {
    return cache[name]
  } else {
    cache[name] = components[name]()
    return cache[name]
  }
}

box.use = function (newcomponents) {
  assert.equal(typeof newcomponents, 'object', 'component-box.use: components should be type object')
  Object.keys(newcomponents).forEach(function (key) {
    assert.equal(typeof newcomponents[key], 'function', 'component-box.use: component handler should be type function for [' + key + ']')
  })

  components = x(components, newcomponents)
}

box.delete = function (key) {
  assert.ok(typeof key === 'string' || typeof key === 'number', 'component-box.delete: key should be type string or number')

  delete cache[key]
}
