var Command = require('ronin').Command,
    ask     = require('asking').ask,
    Promise = require('bluebird');

var removeKey = Command.extend({
  desc: 'remove specific key',

  use: ['redis'],

  options: {
    key: 'string'
  },

  run: function () {
    var key = arguments[1];
    if (!key) throw new Error('empty parameter, key should be presented');
    var storage = this.redis();
    storage.get(key)
      .then(function(val) {
        if (val === null) throw new Error('key was not found');
        return new Promise(function (resolve) {
          ask(
            'Do you want to remove key '+key+' with value '+val+' ?',
            function (err,answer) {
              if (/^y/i.test(answer)) return resolve(storage.del(key));
              console.log('oh, nope?');
              return resolve();
            }
          );
        });
      })
      .then(function () { storage.quit(); })
      .catch(function(err){
        console.error(err);
        storage.quit();
      });
  }
});

module.exports = removeKey;
