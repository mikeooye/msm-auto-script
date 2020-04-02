var Click = require("../click");
var Stage = require("../stage/stage");
var Rect = require("../rect");

var Player = {
  position: [
    Rect.make("354 294 703 663"),
    Rect.make("761 295 1098 662"),
    Rect.make("1173 293 1492 662")
  ],
  select: function(index) {
    Click.clickRect(this.position[index], 5 * 1000);
    Click.clickRect(Rect.make("1872 1251 2413 1372"));
    sleep(10000);
  },
  createNew: function() {
    var player = {
      tickets: {
        // 每日任务
        daymission: 2,
        // 进化系统
        evalution: 0,
        // 精英
        master: 0,
        // 道馆
        kongfu: 0,
        // 迷你地图
        minimap: 0
      },
      menu: Rect.make("2422 20 2528 117"),
      preferedMaster: { x: 700, y: 280, width: 240, height: 183 },

      closeAds: function() {
        // 关闭广告
        Click.clickRect(Rect.make("2274 130 2369 196"));
        Click.clickRect(Rect.make("1846 630 1912 692"));
      },
      selectStage: function() {
        Click.clickRect(this.menu);
        Click.clickRect(Rect.make("2189 27 2356 153"));
      },
      quitStage: function() {
        Click.clickRect(Stage.mainClose);
        Click.clickRect(Rect.make("2274 130 2369 196"));
      },
      selectSetting: function() {
        Click.clickRect(this.menu);
        Click.clickRect(Rect.make("2193 1382 2353 1499"));
      },
      quit: function() {
        Click.clickRect(Rect.make("0 794 313 973"));
        Click.clickRect(Rect.make("1139 517 1400 615"));
        sleep(10000);
      },
      logout: function() {}
    };

    player.play = function(stage) {
      console.log(player.name + " will play " + stage.name);
      var ticket = this.tickets[stage.identifier];
      if (ticket === 0) {
        return;
      }
      Click.clickRect(Stage.getMainItem(stage.index));

      stage.prepare(this);

      Click.clickRect(stage.go);
      stage.beforeConfirm();
      Click.clickRect(stage.confirm);
      stage.afterConfirm();

      var times = ticket - 1;
      var timeCost = this.timeCost ? this.timeCost[stage.identifier] : stage.timeCost;
      for (var index = 0; index < times; index++) {
        sleep(timeCost);
        stage.beforeFinish();
        Click.clickRect(stage.continue);
        stage.beforeConfirm();
        Click.clickRect(stage.confirm);
        stage.afterConfirm();
      }

      sleep(timeCost);
      stage.beforeFinish();
      // 回到上级
      Click.clickRect(stage.back);
      sleep(4000);

      // 返回
      Click.clickRect(Stage.mainBack);
      sleep(3000);
    };

    return player;
  }
};

module.exports = Player;
