
var Player = require('./player.js');

var player = Player.createNew();
player.preferedMaster = { x: 2264, y: 286, width: 240, height: 183 };
player.index = 4;

player.timeCost = {
  // // 每日任务
  // daymission: 40 * 1000,
  // // 进化系统
  // evalution: 310 * 1000,
  // // 精英
  // master: (9 * 60 + 30) * 1000,
  // // 道馆
  // kongfu: 7 * 60 * 1000,
  // // 迷你地图
  // minimap: (15 * 60 + 30) * 1000
}

player.name = 'CatU';
player.level = 131;

module.exports = player;