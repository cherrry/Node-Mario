module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme';

  // Flappy bird
  // define solids
  Stage.solids = Array();

  // Base Land
  Stage.solids.push({ x: 0, y: Stage.height - 1, type: 'Land', attr: { frame: 1, repeat: { x: Stage.width, y: 1 } } });

  // Tubes
  var topTubeLength = [6, 5, 4, 3, 6, 4, 2];
  for (var i=0; i<topTubeLength.length; i++){
    // tube body
    var j;
    for (j=0; j<topTubeLength[i]-1; j++){
      Stage.solids.push({ x: (8+i*5), y: j, type: 'Tube', attr: { frame: 1 } });
    }
    Stage.solids.push({ x: (8+i*5), y: (j++), type: 'Tube', attr: { frame: 2 } });
    j+=5;
    Stage.solids.push({ x: (8+i*5), y: (j++), type: 'Tube', attr: { frame: 0 } });
    for (; j<Stage.height; j++){
      Stage.solids.push({ x: (8+i*5), y: j, type: 'Tube', attr: { frame: 1 } });
    }
  }

  Stage.solids.push({ x: 41, y: Stage.height - 3, type: 'Land', attr: { frame: 23, repeat: { x: 1, y: 2 } } });

  // define collectibles
  Stage.collectibles = Array();

  // 0>nails; 1>mushroom
  var betweenObj =[0, 1, 1, 0, 1, 0];
  for (var i=0; i<betweenObj.length; i++){
    // tube body
    if (betweenObj[i] == 0){
      Stage.collectibles.push({ x: (10+i*5), y: Stage.height - 2, type: 'Water', collidable: true, attr: { type:'upward' } });
      Stage.collectibles.push({ x: (11+i*5), y: Stage.height - 2, type: 'Water', collidable: true, attr: { type:'upward' } });
      Stage.collectibles.push({ x: (12+i*5), y: Stage.height - 2, type: 'Water', collidable: true, attr: { type:'upward' } });
    }else if (betweenObj[i] == 1){
      Stage.collectibles.push({ x: (11+i*5), y: Stage.height - 2, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_' + i , color: 'brown', state: 'alive' } });
    }
  }
  // middle save invisible brick
  Stage.collectibles.push({ x: 22, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_m22', item: ['Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin'], visible:false } });
  // dead end invisible brick
  Stage.collectibles.push({ x: 30, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_m30', item: ['Coin'], visible:false } });
  Stage.collectibles.push({ x: 31, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_m31', item: ['Coin'], visible:false } });
  Stage.collectibles.push({ x: 32, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_m32', item: ['Coin'], visible:false } });
  
  // before end game
  Stage.collectibles.push({ x: 40, y: Stage.height - 2, type: 'Water', collidable: true, attr: { type:'upward' } });
  var k = 0;
  for (var i=0; i<3; i++){
    for (var j=44-i; j<=45; j++){
      Stage.collectibles.push({ x: j, y: 2+i*4, type: 'Brick', collidable: true, attr: { id: 'brick_', item: ['Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin', 'Coin'], visible:true } });
    }
  }

  // End Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -9, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -9, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
