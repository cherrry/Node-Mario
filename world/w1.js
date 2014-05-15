module.exports = (function () {
  var World = Array();

  World[0] = require('./demo/d1.js');
  World[1] = require('./demo/d2.js');

  return World;
})();
