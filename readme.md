<h1 align="center">component-box 📦</h1>

<div align="center">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
</div>

<br />

A little component cacher for things like [fun-component](https://github.com/tornqvist/fun-component) and [nanocomponent](https://github.com/choojs/nanocomponent)

## Usage

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

Meanwhile in another file...

```js
var c = require('component-box')

// return cached `mycomponent`
c('mycomponent')()
```

## API

### `component = c(name, key)`

Return a component. `key` is optional. Works as follows:

```js
// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')()

// return cached `mycomponent`
c('mycomponent')()

// return new `mycomponent` and cache as `boop`
c('mycomponent', 'boop')()

// return cached `mycomponent` with key `boop`
c('mycomponent', 'boop')()

// always return new `mycomponent` (never cache)
c('mycomponent', false)()
```

### `c.use([components])`

Add components to the store. Object values expect Functions which return a component.

```js
var c = require('component-box')

c.use({
  beep: beepComponent,
  boop: boopComponent
})

c('beep')()
c('boop')()
```

 These are shared throughout your app, so in another file you don't need to re-`.use`:

```js
var c = require('component-box')

c('beep')()
c('boop')()
```

### `c.delete(key)`

Remove component from the cache

```js
// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')()

// remove `mycomponent` from cache
c.delete('mycomponent')

// return new `mycomponent` and cache as `mycomponent`
c('mycomponent')()
```


## Real World

This is useful when you are creating components on the fly. References to components are saved for you based on `keys`, that way on app re-renders it will re-use your components so things like `onload` and etc are not wonky. 

In this example we are using post slugs as component keys:

```js
var component = require('fun-component')
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
    return c('post', post.slug)(post)
  })

  return html`
    <div>
      ${posts}
    </div>
  `
}

```

## See Also

- [tornqvist/fun-component](https://github.com/tornqvist/fun-component)
- [choojs/nanocomponent](https://github.com/choojs/nanocomponent)

## License

[MIT](https://tldrlegal.com/license/mit-license)

## Todo

- [x] Asserts
- [ ] Tests
