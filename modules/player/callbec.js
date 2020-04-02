
var Player = require('./player.js');

var callbec = Player.createNew();
callbec.preferedMaster = { x: 705, y: 280, width: 240, height: 183 };

callbec.name = 'callbec';
callbec.level = 144;
callbec.index = 0;

module.exports = callbec;