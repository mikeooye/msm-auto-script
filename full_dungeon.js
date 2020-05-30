var A = require("./action");
var Root = require("./src/target/root");
var MissionMenu = require("./src/target/missionMenu");
var Dungeon = require("./src/target/dungeon/index");
var Account = require("./src/account");

var Option = require("./src/option");
var Key = require("./src/key");

A.prepare();

let options = Option.getMatchOption;
console.log("selection", options);

let players = Account.google;
for (var i = 0; i < players.length; i++) {
  var _player = players[i];

  Root.missionMenu.checkClick();
  MissionMenu.quickDungeon.checkClick();

  options.forEach((curOption) => {
    switch (curOption.value) {
      case Key.daily: {
        Dungeon.quick.daily.checkClick();
        Dungeon.daily.exec(_player);
        break;
      }
      case Key.pirate: {
        Dungeon.quick.pirate.checkClick();
        Dungeon.pirate.exec(_player);
        break;
      }
      case Key.pyramid: {
        Dungeon.quick.pyramid.checkClick();
        Dungeon.pyramid.exec(_player);
        break;
      }
      case Key.mini: {
        Dungeon.quick.mini.checkClick();
        Dungeon.mini.exec(_player);
        break;
      }
      case Key.elite: {
        Dungeon.quick.elite.checkClick();
        Dungeon.elite.exec(_player);
        break;
      }
      case Key.guild: {
        Dungeon.quick.guild.checkClick();
        Dungeon.guild.exec(_player);
        break;
      }
      case Key.wuling: {
        Dungeon.quick.wuling.checkClick();
        Dungeon.wuling.exec(_player);
        break;
      }
      case Key.evolution: {
        Dungeon.quick.evolution.checkClick();
        Dungeon.evolution.exec(_player);
        break;
      }
      default:
        break;
    }
  });

  sleep(5000);
  Dungeon.quick.close.click();
  sleep(2000);
  Dungeon.quick.closeAgin.click();

  if (i + 1 < players.length) {
    var nextPlayer = players[i + 1];
    Account.changePlayer(nextPlayer);
  }
}
