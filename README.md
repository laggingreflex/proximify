# proximify

*Promisify using [ES6 Proxy]*

It's like [bluebird]'s [`promisifyAll`][promisifyAll]\*, but using [ES6 Proxy] which enables it to be:

* Dynamic
* Recursive

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

// Recursive - works at any depth
app.server.listenAsync(3000).then(...)

```



[ES6 Proxy]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[bluebird]: http://bluebirdjs.com/
[promisifyAll]: http://bluebirdjs.com/docs/api/promise.promisifyall.html
