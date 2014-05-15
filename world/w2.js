module.exports = (function () {
  var World = Array();

  var levels = [7, 9];
  for (var i=0; i<levels.length; i++){
  	World[i] = require('./w1/s' + levels[i] );
  }
  World[2] = require('./cherry/c1' + levels[i] );
  return World;
})();
