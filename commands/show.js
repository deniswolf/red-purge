var Command = require('ronin').Command;

var Remove = Command.extend({
  desc: 'show value of key(s) in Redis storage',

  run: function () {
    console.log('please specify if you want to show key or keys');
  }
});

module.exports = Remove;
