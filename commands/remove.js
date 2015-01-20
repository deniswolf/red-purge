var Command = require('ronin').Command;

var Remove = Command.extend({
  desc: 'remove cache from Redis storage',

  run: function () {
    console.log('please specify if you want to remove key or keys');
  }
});

module.exports = Remove;
