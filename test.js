var test = require('tape')
var c = require('.')

test('c.use()', function (t) {
  c.use({
    component: () => prop => console.log(prop)
  })

  var box = c._inspect()

  t.ok('component' in box.components, '`component` passed into box')
  t.end()
})

test('c(\'component\')', function (t) {
  c('component')

  var box = c._inspect()

  t.ok(box._cache.get('component'), '`component` created and cached as `component`')
  t.end()
})

test('c(\'component\', \'custom\')', function (t) {
  c('component', { key: 'custom' })

  var box = c._inspect()

  t.ok(box._cache.get('component-custom'), '`component` created and cached as `custom`')
  t.end()
})

test('c.delete(\'component\')', function (t) {
  c.delete('component')

  var box = c._inspect()

  t.notOk(box._cache.get('component'), '`component` uncached')
  t.end()
})

test('c(\'component\', false)', function (t) {
  c('component', { cache: false })

  var box = c._inspect()

  t.notOk(box._cache.get('component'), '`component` created and not cached')
  t.end()
})
