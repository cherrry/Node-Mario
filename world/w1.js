module.exports = (function () {
  var World = Array();

  var levels = [1, 2];
  var dlevels = [1];
  for (var i=0; i<dlevels.length; i++){
    World[i] = require('./demo/d' + dlevels[i] );   
  } 
  for (var i=dlevels.length; i<dlevels.length+levels.length; i++){
  	World[i] = require('./w1/s' + levels[i-dlevels.length] );
  }

  return World;
})();
