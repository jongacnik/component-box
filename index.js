var x = require('xtend')
var assert = require('nanoassert')

var components = {}
var _cache = null

module.exports = box

function box (name, key) {
  assert.ok(typeof name === 'string' || typeof name === 'number', 'component-box: name should be type string or number')
  assert.ok(components[name], 'component-box: no component handler found for [' + name + ']')

  if (!_cache) _cache = require('./lib/cache')()

  if (key && _cache.get(name + '-' + key)) {
    return _cache.get[name + '-' + key]
  } else if (key) {
    var value = components[name]()
    _cache.set(name + '-' + key, value)
    return value
  } else if (key === false) {
    return components[name]()
  } else if (name && _cache.get(name)) {
    return _cache.get(name)
  } else {
    var value = components[name]()
    _cache.set(name, value)
    return value
  }
}

box.use = function (newcomponents) {
  assert.equal(typeof newcomponents, 'object', 'component-box.use: components should be type object')
  Object.keys(newcomponents).forEach(function (key) {
    assert.equal(typeof newcomponents[key], 'function', 'component-box.use: component handler should be type function for [' + key + ']')
  })

  components = x(components, newcomponents)
}

box.cache = function(cache) {
  assert.ok(typeof cache.get, 'function', 'component-box.cache: cache should have get property of type function')
  assert.ok(typeof cache.set, 'function', 'component-box.cache: cache should have set property of type function')
  assert.ok(typeof cache.remove, 'function', 'component-box.cache: cache should have remove property of type function')
  _cache = cache
}

box.delete = function (key) {
  assert.ok(typeof key === 'string' || typeof key === 'number', 'component-box.delete: key should be type string or number')
  assert.ok(_cache, 'component-box.delete: cache has not been set or initialized')

  _cache.remove(key)
}

box._inspect = function () {
  return x({}, {
    _cache: _cache,
    components: components
  })
}
