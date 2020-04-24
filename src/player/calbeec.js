var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("calbeec", "白毛", 148, 50414, true);
_player.elitePoint = new Node.BaseNode(940, 182);
// 在选择角色的面板中的点
_player.playerNode = new Node.BaseNode(274, 353);
// _player.elitePoint = new Node.BaseNode(271, 188);
module.exports = _player;
