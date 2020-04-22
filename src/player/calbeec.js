var Player = require("./player");
var Node = require("../node/node");

var _player = new Player("calbeec", "白毛", 148, 50414, true);
_player.elitePoint = new Node.BaseNode(681, 182);
// _player.elitePoint = new Node.BaseNode(271, 188);
module.exports = _player;
