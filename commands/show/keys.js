var Promise = require('bluebird'),
    Command = require('ronin').Command;

var removeKeys = Command.extend({
  desc: 'show content for the list of keys separated by "," or presented as regex',

  use: ['redis'],

  options: {
    key: 'string'
  },

  run: function () {
    var param = arguments[1];
    var keysList;
    if (!param) throw new Error('empty parameter');
    var storage = this.redis();

    if (param.indexOf(',') > 0) {
      keysList = new Promise(function (res) {
        return res(param.replace(/\s/, '').split(','));
      });
    }
    else {
      keysList = storage.keys(param);
    }

    keysList.then(function (keys) {
        return Promise.all(
          keys.map(function(key){
          return storage.get(key).then(function (val) {
              return key + ' : ' + val;
            });
          })
        );
      })
      .then(function(values){
        console.log('found keys and their values:');
        console.log(values.join("\n") || "none");
        storage.quit();
      })
      .catch(function (err) {
        console.error(err);
        storage.quit();
      });
  }
});

module.exports = removeKeys;
