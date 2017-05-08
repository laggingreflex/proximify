# proximify

*Promisify using [ES6 Proxy]*

Like [bluebird]'s [promisifyAll], but using [ES6 Proxy] which enables it to be:

* Dynamic - lets you add/remove properties
* Deep - works at any depth

## Install
```
npm i proximify
```

## Usage

### Example

```
import Koa from 'koa';
import http from 'http';
import proximify from 'proximify'

const app = proximify(new Koa());

// Works on properties added later on, and at any depth

app.server = http.createServer(app.callback());
app.server.listenAsync(3000).then(...)


```

### API

```js
proximify(target, options)
```

* **`target`** `[object](required)` Object whose methods need to be patched.
* **`options`** `[object]`:

  * **`deep`** `[boolean](default:true)`: If true, applies to child properties recursively
  * **`store`** `[boolean](default:true)`: If true, stores the proxy in place of original property (i.e. replaces the original property with its proxy)
  * **`applyOnData`** `[boolean](default:true)`: If true, applies to any objects returned (resolved as promise) by the async methods. (equivalent of doing `proximify(...)` on objects returned from async function)

    ```js
    const io1 = proximify(new IO(server))
    const io2 = proximify(new IO(server), {applyOnData: false})

    const socket1 = io.onceAsync('connection')
    const socket2 = io.onceAsync('connection')

    const data1 = socket.onceAsync('test') // works ok
    const data2 = socket.onceAsync('test') // error "onceAsync" undefined
    ```



  * **`suffix`** `[string](default:'Async')`: Suffix to use to invoke the promisified version of the method.
  * `filter` `[function]`: (Not yet implemented)
  * `promisifier` `[function]`: (Not yet implemented)

[ES6 Proxy]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy
[bluebird]: http://bluebirdjs.com/
[promisifyAll]: http://bluebirdjs.com/docs/api/promise.promisifyall.html
