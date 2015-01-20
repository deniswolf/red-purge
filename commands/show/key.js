var Command = require('ronin').Command;

var removeKey = Command.extend({
  desc: 'show the content for specified key',

  use: ['redis'],

  options: {
    key: 'string'
  },

  run: function () {
    var key = arguments[1];
    if (!key) throw new Error('empty parameter, key should be presented');
    var storage = this.redis();
    storage.get(key).then(function (result) {
        if (result === null) result = 'key was not found';
        console.log(key + ' : ' + result);
        storage.quit()
      })
      .catch(function(err){
        console.error(err);
        storage.quit();
      });
  }
});

module.exports = removeKey;
