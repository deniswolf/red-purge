var ronin = require('ronin');

var program = ronin({
  path: __dirname,
  options: {
    url: {
      type: 'string',
      default: 'tcp://localhost:6379'
    }
  },
  desc: 'Tool to manage Redis storage'
});

program.run();
