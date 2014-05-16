module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme_usa';
  Stage.background = 'dark';

  // Big and Small
  // define solids
  Stage.solids = Array();

  // before big small
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 12, y: 2 } } });

  var h =[8, 4, 6, 9];
  for (var i=0; i<h.length; i++){
    Stage.solids.push({ x: 14+(3*i), y: Stage.height - h[i], type: 'Land', attr: { frame: 59, repeat: { x: 1, y: h[i] } } });
  }

  // big small
  Stage.solids.push({ x: 23, y: 0, type: 'Land', attr: { frame: 59, repeat: { x: 26, y: 1 } } });
  Stage.solids.push({ x: Stage.width - 1, y: 0, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: Stage.height } } });
  Stage.solids.push({ x: 24, y: Stage.height - 1, type: 'Land', attr: { frame: 59, repeat: { x: 8, y: 1 } } });
  Stage.solids.push({ x: 34, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 16, y: 2 } } });

  // small section
  Stage.solids.push({ x: 24, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 30, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 9 } } });
  for (var i=0; i<5; i++){
    Stage.solids.push({ x: 25-(i%2), y: 3+(i*2), type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 1 } } });
  }
  Stage.solids.push({ x: 30, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 9 } } });

  // big section
  Stage.solids.push({ x: 31, y: 4, type: 'Land', attr: { frame: 59, repeat: { x: 11, y: 1 } } });
  Stage.solids.push({ x: 44, y: 4, type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 1 } } });
  Stage.solids.push({ x: 45, y: 5, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 3 } } });
  Stage.solids.push({ x: 33, y: 8, type: 'Land', attr: { frame: 59, repeat: { x: 13, y: 1 } } });
  Stage.solids.push({ x: 31, y: 10, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });

  Stage.solids.push({ x: 35, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 40, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });  
  Stage.solids.push({ x: 45, y: 3, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 34, y: 7, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });
  Stage.solids.push({ x: 39, y: 7, type: 'Land', attr: { frame: 59, repeat: { x: 1, y: 1 } } });

  // define collectibles
  Stage.collectibles = Array();

  // lava
  var lavaIndex = [12, 13, 15, 16, 18, 19, 21, 22, 32, 33];
  for (var i=0; i<lavaIndex.length; i++){
    Stage.collectibles.push({ x: lavaIndex[i], y: Stage.height - 1, type: 'Water', collidable: true, attr: {type:'lava'} });
  }

  // power before big small
  Stage.collectibles.push({ x: 11, y: 5, type: 'Brick', collidable: true, attr: { id: 'brickb_0', item: ['Coin', 'Coin','Coin','Coin','Coin'], visible:false } });
  Stage.collectibles.push({ x: 10, y: 9, type: 'Brick', collidable: true, attr: { id: 'brickb_1', item: (function () { var item = []; for (var i = 0; i < 12; i++) { item[i] = 'One-Up'; } return item; })(), visible:true } });
  Stage.collectibles.push({ x: 9, y: 9, type: 'Brick', collidable: true, attr: { id: 'brickb_2', item: (function () { var item = []; for (var i = 0; i < 8; i++) { item[i] = 'Power-Up'; } return item; })(), visible:true } });

  // Coins in small
  for (var i=4; i<=12; i+=2){
    for (var j=24; j<=29; j++){
      Stage.collectibles.push({ x: j, y: i, type: 'Coin', collidable: false, attr: { id: 'coins_' + i + '_' + j  } });
    }
  }
  for (var j=24; j<=29; j++){
    Stage.collectibles.push({ x: j, y: 13, type: 'Coin', collidable: false, attr: { id: 'coins_' + i + '_' + j  } });
  }

  // invisible in small
 for (var i=0; i<4; i++){
    Stage.collectibles.push({ x: 29-(i%2)*5, y: 5 + 2*i, type: 'Brick', collidable: true, attr: { id: 'brickii_' + i, item: ['Coin'], visible:false } });
  }

  // Mushroom
  var mx = [32, 36, 47, 36, 41];
  var my = [3, 3, 3, 7, 7];
  for (var i=0; i<mx.length; i++){
    Stage.collectibles.push({ x: mx[i], y: my[i], type: 'Mushroom', collidable: true, attr: { id: 'mushroom_' + i, color: 'brown', state: 'alive' } });
  }

  // nails
  for (var i=5; i<=7; i++){
    Stage.collectibles.push({ x: 44, y: i, type: 'Water', collidable: true, attr: {type:'leftward'} });
  }
  Stage.collectibles.push({ x: 31, y: 5, type: 'Water', collidable: true, attr: {type:'downward'} });

  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });


  return Stage;
})();
