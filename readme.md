<h1 align="center">component-box 📦</h1>

<div align="center">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
   <a href="https://www.npmjs.com/package/component-box">
    <img src="https://img.shields.io/npm/v/component-box.svg?style=flat-square" alt="NPM version" />
  </a>
  <a href="https://travis-ci.org/jongacnik/component-box">
    <img src="https://img.shields.io/travis/jongacnik/component-box/master.svg?style=flat-square"
      alt="Build Status" />
  </a>
</div>

<br />

A little component cacher for things like [nanocomponent](https://github.com/choojs/nanocomponent)

## Usage

```js
var Nanocomponent = require('nanocomponent')
var html = require('bel')
var c = require('component-box')

// component
class MyComponent extends Nanocomponent {
  createElement (text) {
    return html`<div>${text}</div>`
  }
}

// function which returns component instance
function createMyComponent () {
  return new MyComponent()
}

c.use({
  mycomponent: createMyComponent
})

// return and render new `mycomponent`
c('mycomponent').render()
```

Meanwhile in another file...

```js
var c = require('component-box')

// return and render cached `mycomponent`
c('mycomponent').render()
```

## API

### `component = c(name, key)`

Return a component. `key` is optional. Works as follows:

```js
// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')

// return cached `mycomponent`
c('mycomponent')

// return new `mycomponent` and cache as `boop`
c('mycomponent', 'boop')

// return cached `mycomponent` with key `boop`
c('mycomponent', 'boop')

// always return new `mycomponent` (never cache)
c('mycomponent', false)
```

### `c.use([components])`

Add components to the store. Object values expect Functions which return a component.

```js
var c = require('component-box')

c.use({
  beep: beepComponent,
  boop: boopComponent
})

c('beep').render()
c('boop').render()
```

 These are shared throughout your app, so in another file you don't need to re-`.use`:

```js
var c = require('component-box')

c('beep').render()
c('boop').render()
```

### `c.delete(key)`

Remove component from the cache

```js
// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')

// remove `mycomponent` from cache
c.delete('mycomponent')

// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')
```

### `c.cache(cache)`

Use a custom cache implementation. Expects an object with `.get`, `.set`, and `.remove` methods.

```js
var c = require('component-box')

c.cache(require('lru')(2)) // only cache 2 instances, using lru eviction

c.use({
  post: postComponent
})

c('post', 'slug1').render()
c('post', 'slug2').render()
c('post', 'slug3').render() // evict 'post-slug1' and return new 'post-slug3' instance
```

## Alternative Pattern

You could also choose to only return the `.render` method from nanocomponent, allowing for a slightly more concise syntax:

```js
// function which creates component instance and returns render method
function createMyComponent () {
  var component = new MyComponent()
  return function () {
    return component.render(...arguments)
  }
}
```

```js
// directly calls nanocomponent .render
c('mycomponent')()
```

## Real World

This module is useful when you are creating components on the fly. References to components are saved for you based on `keys`, that way on app re-renders it will re-use your components so things like `load` and etc are not wonky. 

In this example we are using post slugs as component keys:

```js
var html = require('bel')
var c = require('component-box')

c.use({
  post: require('my-post-component')
})

var postsData = [
  { title: 'Beep', slug: 'beep' },
  { title: 'Boop', slug: 'boop' },
  { title: 'Blap', slug: 'blap' }
]

function view () {
  var posts = postsData.map(function (post) {
    return c('post', post.slug).render(post)
  })

  return html`<div>${posts}</div>`
}

```

## More Examples

### [fun-component](https://github.com/tornqvist/fun-component)

```js
var component = require('fun-component')
var html = require('bel')
var c = require('component-box')

// function which returns a component
function mycomponent () {
  return component(function (props) {
    return html`<div>Hello!<div>`
  })
}

c.use({
  mycomponent: mycomponent
})

// return new `mycomponent`
c('mycomponent')()
```

## See Also

- [choojs/nanocomponent](https://github.com/choojs/nanocomponent)
- [tornqvist/fun-component](https://github.com/tornqvist/fun-component)

## License

[MIT](https://tldrlegal.com/license/mit-license)
