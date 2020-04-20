var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("Ocma", "冰雷法师", 110, 19642, false);
_player.elitePoint = new Node.BaseNode(327, 199);

module.exports = _player;
