const proximify = require('..');
const fs = proximify(require('fs'));

module.exports = async () => {
  try {
    await fs.readFileAsync('unknown')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
