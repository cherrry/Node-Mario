module.exports = (function () {
  var World = Array();

  var levels = [1, 2];
  for (var i=0; i<levels.length; i++){
  	World[i] = require('./w1/s' + levels[i] );
  }

  return World;
})();
