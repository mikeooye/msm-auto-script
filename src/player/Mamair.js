var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("Mamair", "无影人", 136, 37909, true);
_player.elitePoint = new Node.BaseNode(408, 182);
_player.playerNode = new Node.BaseNode(468, 360);
// _player.elitePoint = new Node.BaseNode(271, 188);
module.exports = _player;
