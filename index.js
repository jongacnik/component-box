var x = require('xtend')

var cache = {}
var components = {}

module.exports = box

function box (name, key) {
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
  components = x(components, newcomponents)
}

box.delete = function (key) {
  delete cache[key]
}
