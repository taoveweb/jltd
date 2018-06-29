const $ = require('dekko');

$('dist')
  .isDirectory()
  .hasFile('jltd.css')
  .hasFile('jltd.min.css')
  .hasFile('jltd.js')
  .hasFile('jltd.min.js');

// eslint-disable-next-line
console.log('`dist` directory is valid.');
