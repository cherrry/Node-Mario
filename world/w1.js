module.exports = (function () {
  var World = Array();

  World[0] = require('./w1/s1');
  World[1] = require('./w1/s2');

  return World;
})();
