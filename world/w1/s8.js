module.exports = (function () {
    var Stage = {};

    Stage.width = 50;
    Stage.height = 15;

    Stage.theme = 'theme';

    Stage.solids = Array();
    
    // Base Land
    Stage.solids.push({ x: 0, y: Stage.height -1, type: 'Land', attr: { frame: 1, repeat: { x: 19, y: 1} } });
    Stage.solids.push({ x: 19, y: Stage.height -1, type: 'Land', attr: { frame: 53, repeat: { x: 1, y: 1} } });
    Stage.solids.push({ x: 20, y: Stage.height -1, type: 'Land', attr: { frame: 13, repeat: { x: 1, y: 1} } });
    Stage.solids.push({ x: 21, y: Stage.height -1, type: 'Land', attr: { frame: 52, repeat: { x: 1, y: 1} } });
    Stage.solids.push({ x: 22, y: Stage.height -1, type: 'Land', attr: { frame: 1, repeat: { x: Stage.width-22, y: 1} } });
    
    Stage.solids.push( { x: 19, y: Stage.height - 11, type: 'Land', attr: { frame: 24, repeat: { x: 1, y: 1} } });
    Stage.solids.push( { x: 20, y: Stage.height - 11, type: 'Land', attr: { frame: 25, repeat: { x: 1, y: 1} } });
    Stage.solids.push( { x: 21, y: Stage.height - 11, type: 'Land', attr: { frame: 26, repeat: { x: 1, y: 1} } });
    Stage.solids.push( { x: 19, y: Stage.height - 10, type: 'Land', attr: { frame: 36, repeat: { x: 1, y: 9} } });
    Stage.solids.push( { x: 20, y: Stage.height - 10, type: 'Land', attr: { frame: 37, repeat: { x: 1, y: 9} } });
    Stage.solids.push( { x: 21, y: Stage.height - 10, type: 'Land', attr: { frame: 38, repeat: { x: 1, y: 9} } });

    //Stage.solids.push( { x: 25, y: Stage.height - 5, type: 'Land', attr: { frame: 35, repeat: { x: 6, y: 1} } });

    Stage.solids.push( { x: 33, y: 0, type: 'Land', attr: { frame: 35, repeat: { x: 1, y: Stage.height-2} } });
    Stage.solids.push( { x: 42, y: 3, type: 'Land', attr: { frame: 35, repeat: { x: 1, y: Stage.height-4} } });
    Stage.solids.push( { x: 34, y: Stage.height -5, type: 'Land', attr: { frame: 35, repeat: { x: 3, y: 1} } });
    Stage.solids.push( { x: 39, y: Stage.height -8, type: 'Land', attr: { frame: 35, repeat: { x: 3, y: 1} } });
    Stage.solids.push( { x: 34, y: 3, type: 'Land', attr: { frame: 35, repeat: { x: 5, y: 1} } });

    // define collectibles
    Stage.collectibles = Array();

    for (var i = 9; i < 14; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item: ['Coin', 'Coin', 'Coin'], visible:true } });
    }

    for (var i = 10; i < 14; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brick_' + (i+10), item: [], visible:false } });
    }

    for (var i= 25; i < 31; i++){
        Stage.collectibles.push({ x: i, y: Stage.height - 5, type: 'Brick', collidable: true, attr: { id: 'brick_bottom_' + i, item: ['Mushroom', 'Mushroom'], breakable: true, visible:true } });
    }

    for (var i = 26; i < 31; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 9, type: 'Brick', collidable: true, attr: { id: 'brick_' + i, item: ['Coin', 'Coin', 'Coin'], visible:true } });
    }

    for (var i = 27; i < 31; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 12, type: 'Brick', collidable: true, attr: { id: 'brick_' + (i+10), item: ['Power-Up', 'Coin', 'Coin'], visible:true } }    );
    }

    for (var i = 9; i < 14; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 6, type: 'Coin', collidable: false, attr: { id: 'coin_'+i } });
    }
    for (var i = 10; i < 14; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 10, type: 'Coin', collidable: false, attr: { id: 'coin_'+(i+10) } });
    }

    for (var i = 34; i < 37; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 6, type: 'Coin', collidable: false, attr: { id: 'coin_'+ i } });
    }
    for (var i = 39; i < 42; i++) {
        Stage.collectibles.push({ x: i, y: Stage.height - 9, type: 'Coin', collidable: false, attr: { id: 'coin_'+(i+10) } });
    }
    for (var i = 34; i < 39; i++) {
        Stage.collectibles.push({ x: i, y: 2, type: 'Coin', collidable: false, attr: { id: 'coin_'+(i+20) } });
    }

    Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -9, type: 'Flagpole', collidable: false, attr: {id: 'flagpole' } });
    Stage.collectibles.push({ x: Stage.width - 4, y: Stage.height -9, type: 'Flag', collidable: false, attr: {id: 'flag', music: 'end-level' } });

    return Stage;
})();
