# proximify

*Promisify using [ES6 Proxy]*

It's like [bluebird]'s [`promisifyAll`][promisifyAll]\*, but using [ES6 Proxy] which enables it to be:

* Dynamic
* Deep

## Install
```
npm i proximify
```

## Usage
```
import Koa from 'koa';
import http from 'http';
import proximify from 'proximify'

const app = proximify(new Koa());

// Dynamic - lets you add/remove properties
app.server = http.createServer(app.callback());

// Deep - works at any depth
app.server.listenAsync(3000).then(...)
```

## Options

```js
proximify(target, {
  deep: true, // apply to child objects recursively
  store: true, // store proxy in place of original object
  applyOnData: false, // apply to returned data as well
  suffix: 'Async', // suffix to use
  // filter(), // todo
  // promisifier(), // todo
  symbol: Symbol('__PROXIMIFIED__'), // symbol to mark the object
});
```

### `applyOnData`

Using this applies `proximify` to any data returned by the function as well. For eg.:

```js
const io = proximify(new IO(server), {applyOnData: true})

const socket = io.onceAsync('connection')
// {applyOnData} applies `proximify` on this returned `socket` object as well

const data = socket.onceAsync('test')
// this wouldn't have worked without {applyOnData: true} on `io`
```

[ES6 Proxy]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[bluebird]: http://bluebirdjs.com/
[promisifyAll]: http://bluebirdjs.com/docs/api/promise.promisifyall.html
