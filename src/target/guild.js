var Node = require("../node/node");
var Color = require("../color");
var Root = require("./root");
var MissionMenu = require("./missionMenu");

var identifier = [
  // 窗口蓝灰色标题栏
  new Node.BaseNode(97, 79, Color.blueGrey),
  // 右下角蓝色按钮
  new Node.BaseNode(366, 358, "#d3d6d9"),
];

var dungeonIdentifier = [
  new Node.BaseNode(400, 82, Color.blueGrey),
  new Node.BaseNode(923, 712, Color.blue),
];

var settleId = [
  new Node.BaseNode(486, 605, Color.blue),
  new Node.BaseNode(772, 608, Color.orange),
];

var giveIdentifier = [
  new Node.BaseNode(131, 75, Color.blueGrey),
  new Node.BaseNode(947, 566, Color.orange),
];

module.exports = {
  // 主窗口
  mainWindow: new Node.ViewNode(identifier, 0, 0, true, 10000),
  // 返回
  back: new Node.BaseNode(43, 73),
  close: new Node.BaseNode(1243, 80),
  sign: new Node.BaseNode(1180, 283),
  dungeon: new Node.BaseNode(798, 532),
  dungeonWindow: new Node.ViewNode(dungeonIdentifier, 0, 0, true, 5000),
  dungeonBonus: new Node.BaseNode(1181, 712),
  dungeonGo: new Node.ViewNode(
    dungeonIdentifier.concat([new Node.BaseNode(559, 699, Color.orange)]),
    519,
    703,
    true,
    5000
  ),
  give: new Node.BaseNode(1178, 698),
  // 结算窗口
  settlementWindow: new Node.ViewNode(settleId, 0, 0, true),
  continue: new Node.BaseNode(827, 601),
  menu: new Node.BaseNode(640, 609),
  // 结算窗口返回到主窗口
  backToMainWindow: new Node.BaseNode(623, 677),
  giveWindow: new Node.ViewNode(giveIdentifier, 0, 0, true, 5000),
  give150: new Node.BaseNode(1059, 580),

  exec: function (player) {
    this.mainWindow.wait();
    // 新活动，welcome 欢迎语
    sleep(5000);
    // 签到
    this.sign.click();
    this.dungeon.click();
    this.dungeonWindow.wait();
    this.dungeonBonus.click();
    while (1) {
      if (!this.dungeonGo.checkClick()) {
        break;
      }
      this.settlementWindow.wait();
      this.menu.click();
    }

    this.back.click();

    this.mainWindow.wait();
    this.give.click();
    this.giveWindow.wait();
    this.give150.click();
    this.close.click();

    Root.missionMenu.checkClick();
    MissionMenu.quickDungeon.checkClick();
  },
};
