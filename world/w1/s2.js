module.exports = (function () {
  var Stage = {};

  Stage.width = 75;
  Stage.height = 15;

  Stage.theme = 'theme3';
  Stage.background = 'dark';

  // Big lava
  // define solids
  Stage.solids = Array();

  // base
  Stage.solids.push({ x: 0, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 15, y: 2 } } });
  Stage.solids.push({ x: 30, y: Stage.height - 3, type: 'Land', attr: { frame: 59, repeat: { x: 25, y: 3 } } });
  Stage.solids.push({ x: 67, y: Stage.height - 2, type: 'Land', attr: { frame: 59, repeat: { x: 8, y: 2 } } });

  // steps
  Stage.solids.push({ x: 13, y: Stage.height - 6, type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 1 } } });
  Stage.solids.push({ x: 20, y: Stage.height - 9, type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 1 } } });
  Stage.solids.push({ x: 27, y: Stage.height - 6, type: 'Land', attr: { frame: 59, repeat: { x: 5, y: 1 } } });

  // define collectibles
  Stage.collectibles = Array();

  // lava
  for (var i=15; i<30; i++){
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {type:'lava'} });
  }
  for (var i=55; i<67; i++){
    Stage.collectibles.push({ x: i, y: Stage.height - 1, type: 'Water', collidable: true, attr: {type:'lava'} });
  }

  // Question
  Stage.collectibles.push({ x: 15, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brickb_1', item: ['Coin', 'Coin', 'Coin', 'Coin', 'Coin'], visible:true } });
  Stage.collectibles.push({ x: 16, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brickb_2', item: ['Power-Up'], visible:false } });
  Stage.collectibles.push({ x: 28, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brickb_3', item: ['Power-Up'], visible:false } });
  Stage.collectibles.push({ x: 29, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brickb_4', item: ['Coin', 'Coin', 'Coin', 'Coin', 'Coin'], visible:true } });
  
  // 1-ups 
  for (var i=36; i<=42; i+=3){
    Stage.collectibles.push({ x: i, y: Stage.height - 7, type: 'Brick', collidable: true, attr: { id: 'brickup_' + i, item: (function () { var item = []; for (var i = 0; i < 28; i++) { item[i] = 'One-Up'; } return item; })(), breakable: true, visible:true } }); 
  }

  // Coins
  // for (var i = 60; i <70; i++) {
  //   for (var j = 0; j < Stage.height - 3; j++) {
  //     if ((i+j)%2 == 1){
  //       Stage.collectibles.push({ x: i, y: j, type: 'Coin', collidable: false, attr: { id: 'coin_1_' + i + '_' + j } });
  //     }
  //   }
  // }
  
  // Flag
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -10, type: 'Flag', collidable: false, attr: { id: 'flag', music: 'end-level' } });


  return Stage;
})();
