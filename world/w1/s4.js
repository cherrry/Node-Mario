module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme3';

  // Sea
  // define solids
  Stage.solids = Array();

  var left = [18, 33, 40, 45];
  var middle = [0, 19, 34, 41, 46];
  var mLength = [11, 9, 4, 1, 4];
  var right = [11, 28, 38, 42];

  // land
  for (var i=0; i<left.length; i++){
    Stage.solids.push({ x: left[i], y: Stage.height - 2, type: 'Land', attr: { frame: 0, repeat: { x: 1, y: 1 } } });
    Stage.solids.push({ x: left[i], y: Stage.height - 1, type: 'Land', attr: { frame: 12, repeat: { x: 1, y: 1 } } });
  }
  for (var i=0; i<middle.length; i++){
    Stage.solids.push({ x: middle[i], y: Stage.height - 2, type: 'Land', attr: { frame: 1, repeat: { x: mLength[i], y: 1 } } });
    Stage.solids.push({ x: middle[i], y: Stage.height - 1, type: 'Land', attr: { frame: 13, repeat: { x: mLength[i], y: 1 } } });   
  }
  for (var i=0; i<right.length; i++){
    Stage.solids.push({ x: right[i], y: Stage.height - 2, type: 'Land', attr: { frame: 2, repeat: { x: 1, y: 1 } } });
    Stage.solids.push({ x: right[i], y: Stage.height - 1, type: 'Land', attr: { frame: 14, repeat: { x: 1, y: 1 } } });
  }

  // tube
  var tubeX = [10, 18, 45];
  var tubeY = [9,  10, 10];
  for (var i=0; i<tubeX.length; i++){
    Stage.solids.push({ x: tubeX[i], y: tubeY[i], type: 'Tube', attr: { frame: 0 } });
    for (var j=tubeY[i]+1; j<13; j++){
      Stage.solids.push({ x: tubeX[i], y: j, type: 'Tube', attr: { frame: 1 } });
    }
  }
  
  // block group 1
  for (var i=0; i<5; i++){
    Stage.solids.push({ x: 27, y: Stage.height - 3 - (2*i), type: 'Land', attr: { frame: 23, repeat: { x: 2+i, y: 1 } } });
  }

  // block group 2
  for (var i=0; i<4; i++){
    Stage.solids.push({ x: 35+i, y: Stage.height - 3 - i, type: 'Land', attr: { frame: 23, repeat: { x: 4-i, y: 1 } } });
  }

  Stage.collectibles = Array();

  // Water 
  var waterIndex = [12, 13, 14, 15, 16, 17, 29, 30, 31, 32, 39, 43, 44];
  for (var i=0; i<waterIndex.length; i++){
    Stage.collectibles.push({ x: waterIndex[i], y: Stage.height - 1, type: 'Water', collidable: true, attr: {type:'water'} });
  }

  // block group 1
  Stage.collectibles.push({ x: 20, y: 7, type: 'Brick', collidable: true, attr: { id: 'brickp_20', item: ['Power-Up', 'Power-Up', 'Power-Up', 'Power-Up'], visible:true } });
  for (var i=0; i<5; i++){
    for (var j=0; j<2+i; j++){
      Stage.collectibles.push({ x: 27+j, y: Stage.height - 4 - (2*i), type: 'Coin', collidable: false, attr: { id: 'coin1_' + i + '_' + j } });
    }
  }
  Stage.collectibles.push({ x: 21, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_0', color: 'brown', state: 'alive' } });
  Stage.collectibles.push({ x: 25, y: Stage.height - 3, type: 'Mushroom', collidable: true, attr: { id: 'mushroom_1', color: 'brown', state: 'alive' } });

  // block group 3rd (invisible)
  var k = 0;
  for (var i=40; i<43; i++){
    for (var j=5; j<11; j+=3){
      Stage.collectibles.push({ x: i, y: Stage.height - j, type: 'Brick', collidable: true, attr: { id: 'brickq_' + k, item: ['One-Up'], visible:false } });
      k++;    
    }
  }
  for (var i=11; i<=13; i++){
    Stage.collectibles.push({ x: 42, y: Stage.height - i, type: 'Brick', collidable: true, attr: { id: 'brickq_' + k, item: ['Coin', 'Coin', 'Coin', 'Coin'], breakable: true, visible:false } });
    k++;  
  }
  
  // Flag
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });

  return Stage;
})();
