var Player = require("modules/player/index");
var Stage = require("modules/stage/index.js");

var allPlayers = Player.all;

// console.show();
// console.log(allPlayers);

// console.log(allStage);
var allStage = Stage.all;

// var player = Player.catu;




var players = [Player.ifufo, Player.catu];
for (var index = 0; index < players.length; index++) {
  var element = players[index];
  Player.base.select(element.index);

  element.closeAds();

  element.selectStage();

  for (var sIndex = 0; sIndex < allStage.length; sIndex++) {
    var stage = allStage[sIndex];
    sleep(200);
    element.play(stage);
  }

  element.quitStage();

  element.selectSetting();
  element.quit();
}