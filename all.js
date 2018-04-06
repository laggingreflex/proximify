// Function.prototype

// console.log(Object.prototype);

Object.prototype = new Proxy(Object.prototype, {
  get(t, key) {
    console.log(`key:`, key);

  }
})
