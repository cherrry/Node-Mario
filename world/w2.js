module.exports = (function () {
  var World = Array();

  for (var i = 0; i < 5; i++) {
    World[i] = require('./w1/s' + (5 - i) );
  }

  return World;
})();
