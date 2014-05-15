module.exports = (function () {
  var World = Array();

  var levels = [8, 4, 6, 6, 3];
  for (var i=0; i<levels.length; i++){
  	World[i] = require('./w1/s' + levels[i] );
  }
  World[3] = require('./cherry/c1');
  return World;
})();
