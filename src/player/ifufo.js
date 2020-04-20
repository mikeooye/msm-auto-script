var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("ifufo", "尖兵", 175, 71840, true);
// _player.elitePoint = new Node.BaseNode(1070, 197);
_player.elitePoint = new Node.BaseNode(271, 188);
module.exports = _player;
