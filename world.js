module.exports = (function () {
  var Worlds = {};

  Worlds.W1 = require('./world/w1');
  Worlds.W2 = require('./world/w2');
  Worlds.W3 = require('./world/w3');

  return Worlds;
})();
