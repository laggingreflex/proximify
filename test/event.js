const EventEmitter = require('events');
const proximify = require('..');

const myEventEmitter = new EventEmitter();
const myPromisifiedEventEmitter = proximify(myEventEmitter);

myPromisifiedEventEmitter.onAsync('test').then(console.log).catch((...e) => console.error('error:', ...e))
myPromisifiedEventEmitter.on('test', (...data) => console.log('data:', ...data))

myPromisifiedEventEmitter.emit('test', 'should be this text')
