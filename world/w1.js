module.exports = (function () {
  var World = Array();

  for (var i=0; i<5; i++){
  	World[i] = require('./w1/s' + (i+1) );
  }
  //World[0] = require('./w1/s3' );

  return World;
})();
