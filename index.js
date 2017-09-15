var x = require('xtend')

var cache = {}
var components = {}

module.exports = box

function box (name, key) {
  if (key && cache[key]) {
    // console.log('key provided, fetching cached component', key)
    return cache[key]
  } else if (key) {
    // console.log('key provided, creating new component', key)
    cache[key] = components[name]()
    return cache[key]
  } else if (name && cache[name]) {
    // console.log('name provided, fetching cached component', name)
    return cache[name]
  } else if (key === false) {
    // console.log('force uncached component', name)
    return components[name]() 
  } else {
    // console.log('name provided, creating new component', name)
    cache[name] = components[name]()
    return cache[name]
  }
}

box.use = function (newcomponents) {
  components = x(components, newcomponents)
}

box.delete = function (key) {
  delete cache[key]
}
