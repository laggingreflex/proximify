require('./check-proxy-support')

const defaultOptions = {
  recursive: true,
  store: true,
  symbol: Symbol('__PROXIMIFIED__'),
  suffix: 'Async',
  // filter(), // todo
  // promisifier(), // todo
}

module.exports = function proximify(originalTarget, opts = {}) {
  Object.assign(opts, defaultOptions)

  if (opts.symbol && originalTarget[opts.symbol]) {
    return originalTarget;
  } else if (opts.symbol) {
    originalTarget[opts.symbol] = true;
  }

  return new Proxy(originalTarget, {
    get(target, name) {
      const val = target[name];

      if (typeof name !== 'string') {
        return val
      }

      if (typeof val !== 'undefined') {
        if (val && typeof val === 'object' && opts.recursive) {
          const proxy = proximify(val, opts)
          if (opts.store) {
            target[name] = proxy
          }
          return proxy;
        }
        if (val && typeof val === 'function') {
          return val.bind(target)
        }
        return val
      }

      if (name.substr(-opts.suffix.length) !== opts.suffix) {
        return
      }

      const oName = name.substring(0, name.length - opts.suffix.length);
      const oVal = target[oName];

      if (typeof oVal !== 'function') {
        return
      }

      const fnSync = oVal.bind(target)

      return (...args) => {
        let callback = () => {};
        if (typeof args[args.length - 1] === 'function') {
          callback = args[args.length - 1]
          args.pop();
        }

        return new Promise((resolve, reject) => fnSync(...args, (err, ...data) => {
          callback(err, ...data);
          if (err === null || typeof err === 'undefined') {
            return resolve(...data)
          }
          if (err instanceof Error) {
            return reject(err)
          }
          if (!data.length) {
            // no data, but error is not an Error... it must be data?
            return resolve(err)
          } else {
            // data exists, but err is not an Error... ?
            return reject(err, ...data)
          }
        }))
      }
    }
  });
}
