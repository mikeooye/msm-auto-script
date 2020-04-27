var A = require("./action");
var C = require("./config");
var Root = require("./src/target/root");
var MissionMenu = require("./src/target/missionMenu");
var QuickDungeon = require("./src/target/dungeon/quick");
var ifufo = require("./src/player/ifufo");
var calbeec = require("./src/player/calbeec");
var Mamair = require("./src/player/Mamair");
var Dungeon = require("./src/target/dungeon/index");
var Account = require("./src/account");
var Ads = require("./src/ads");
var Mainline = require("./src/target/mainline");

A.prepare();

// Mainline.exec(ifufo);

// Account.changePlayer(Mamair);

let titles = ["Apple 账号", "ifufo"];
let selection = dialogs.select("选择账号方式", titles);
let players = [];
if (selection == 0) {
  players = Account.apple;
} else {
  players = Account.google;
}

// let players = Account.google;
for (var i = 0; i < players.length; i++) {
  var _player = players[i];

  Root.missionMenu.checkClick();
  MissionMenu.quickDungeon.checkClick();
  Dungeon.quick.pirate.checkClick();
  Dungeon.pirate.exec(_player);
  Dungeon.quick.pyramid.checkClick();
  Dungeon.pyramid.exec(_player);
  Dungeon.quick.daily.checkClick();
  Dungeon.daily.exec(_player);
  Dungeon.quick.mini.checkClick();
  Dungeon.mini.exec(_player);
  Dungeon.quick.elite.checkClick();
  Dungeon.elite.exec(_player);
  if (_player.hasGuild) {
    Dungeon.quick.guild.checkClick();
    Dungeon.guild.exec(_player);
  }
  Dungeon.quick.wuling.checkClick();
  Dungeon.wuling.exec(_player);
  Dungeon.quick.evolution.checkClick();
  Dungeon.evolution.exec(_player);

  sleep(5000);
  Dungeon.quick.close.click();
  sleep(2000);
  Dungeon.quick.closeAgin.click();

  if (i + 1 < players.length) {
    var nextPlayer = players[i + 1];
    Account.changePlayer(nextPlayer);
  }
}
