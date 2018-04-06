const { readdirSync } = require('fs');
const { basename } = require('path');

const tests = readdirSync(__dirname).filter(_ => _ !== basename(__filename)).map(_ => require('./' + _));

Promise.all(tests.map(_ => _()))
  .then(() => console.log('ok'))
  .catch(e => {
    console.error(e);
    console.error('fail');
    process.exit(1);
  });
