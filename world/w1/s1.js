module.exports = (function () {
  var Stage = {};

  Stage.width = 30;
  Stage.height = 10;

  // define solids
  Stage.solids = Array();

  for (var i = 0; i < 30; i++) {
    Stage.solids.push({ x: i, y: 9, type: 'Land' });
  }

  return Stage;
})();
