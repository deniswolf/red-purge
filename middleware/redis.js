var redis = require('then-redis');

module.exports = function middlewareName (next) {
  this.redis = function () {
    var env = process.env.RED_PURGE,
        url;
    if (env){
      console.log('using redis url from env params:', env);
      url = env;
    } else {
      url = this.global.url;
    }
    return redis.createClient(url);
  };

  next();
};