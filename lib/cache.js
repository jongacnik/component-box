module.exports = Cache

function Cache() {
  if (!(this instanceof Cache)) return new Cache()
  this._cache = {}
}

Cache.prototype.get = function (key) {
  return this._cache[key]
}

Cache.prototype.set = function (key, value) {
  this._cache[key] = value
}

Cache.prototype.remove = function (key) {
  delete this._cache[key]
}
