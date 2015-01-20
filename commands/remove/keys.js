var Promise = require('bluebird'),
    ask     = require('asking').ask,
    Command = require('ronin').Command;

var removeKeys = Command.extend({
  desc: 'remove cache from Redis storage, treated as a list if parameter includes "," and as a regexp otherwise',

  use: ['redis'],

  options: {
    key: 'string'
  },

  run: function () {
    var param = arguments[1];
    var keysList;
    if (!param) throw new Error('empty parameter');
    var storage = this.redis();

    function removeAndReturnKey(key){
      return storage
        .del(key)
        .then(function () {
          return key;
        });
    }

    if (param.indexOf(',') > 0) {
      keysList = new Promise(function (res) {
        return res(param.replace(/\s/, '').split(','));
      });
    }
    else {
      keysList = storage.keys(param);
    }

    keysList.then(
      function (keys) {
        return new Promise(function (resolve, reject) {
          if (!keys.length){ return reject('no keys found for: '+ param); }
          console.log('found keys:');
          console.log(keys.join("\n"));
          ask('Do you want to remove these keys? (Y/N)',
            function (err,answer) {
              if (!(/^y/i.test(answer))){
                return resolve(['none']);
              }
              return resolve(Promise.all(keys.map(removeAndReturnKey)));
            }
          )});
      })
      .then(function (removedKeys) {
        console.log('removed keys:');
        console.log(removedKeys.join("\n"));
        storage.quit();
      })
      .catch(function (err) {
        console.error(err);
        storage.quit();
      });
  }
});

module.exports = removeKeys;
