const proximify = require('..');
const EventEmitter = require('events');

module.exports = async () => {
  const myEventEmitter = new EventEmitter();
  const myPromisifiedEventEmitter = proximify(myEventEmitter);

  const p = Promise.all([
    myPromisifiedEventEmitter.onAsync('test'),
    new Promise(r => myPromisifiedEventEmitter.on('test', r)),
  ]);

  myPromisifiedEventEmitter.emit('test', 'should be this text');

  await p;
}
