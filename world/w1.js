module.exports = (function () {
  var World = Array();

  for (var i=0; i<4; i++){
  	World[i] = require('./w1/s' + (i+1) );
  }

  return World;
})();
