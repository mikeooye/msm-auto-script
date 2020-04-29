var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("Mamair", "无影人", 140, 49927, true);
_player.elitePoint = new Node.BaseNode(806, 182); // 火龙
_player.playerNode = new Node.BaseNode(468, 360); // 顺位2
// _player.elitePoint = new Node.BaseNode(271, 188);
module.exports = _player;
