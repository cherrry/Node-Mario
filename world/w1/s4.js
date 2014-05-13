module.exports = (function () {
  var Stage = {};

  Stage.width = 50;
  Stage.height = 15;

  Stage.theme = 'theme3';

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < 50; i++) {
    if (i!=39 && i!=43 && i!=44){
      Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
      Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
    }
  }

  for (var i = 45; i < 50; i++) {
    Stage.solids.push({ x: i, y: Stage.height - 1, type: 'Land', attr: {} });
    Stage.solids.push({ x: i, y: Stage.height - 2, type: 'Land', attr: {} });
  }

  Stage.solids.push({ x: 45, y: Stage.height - 5, type: 'Tube', attr: { frame: 0 } });
  Stage.solids.push({ x: 45, y: Stage.height - 4, type: 'Tube', attr: { frame: 1 } });
  Stage.solids.push({ x: 45, y: Stage.height - 3, type: 'Tube', attr: { frame: 1 } });


  Stage.collectibles = Array();

  var k = 0;

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j <= i; j++){
      Stage.collectibles.push({ x: i+35, y: Stage.height - 3 - j, type: 'Brick', collidable: true, attr: { id: 'brick_' + k, item: [], visible:true } });
      k++;
    }
  }

  for (var i=40; i<43; i++){
    for (var j=5; j<11; j+=3){
      Stage.collectibles.push({ x: i, y: Stage.height - j, type: 'Brick', collidable: true, attr: { id: 'brick_' + k, item: ['Coin'], visible:false } });
      k++;    
    }
  }
  Stage.collectibles.push({ x: 42, y: Stage.height - 11, type: 'Brick', collidable: true, attr: { id: 'brick_' + k, item: ['Coin'], visible:false } });
      

  Stage.collectibles.push({ x: 39, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  Stage.collectibles.push({ x: 43, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });
  Stage.collectibles.push({ x: 44, y: Stage.height - 1, type: 'Water', collidable: true, attr: {} });

  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flagpole', collidable: false, attr: { id: 'flagpole' } });
  Stage.collectibles.push({ x: Stage.width - 3, y: Stage.height - 10, type: 'Flag', collidable: false, attr: { id: 'flag' } });

  return Stage;
})();
