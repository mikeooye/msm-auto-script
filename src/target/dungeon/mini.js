var Color = require("../../color");
var Node = require("../../node/node");
var Action = require("../action");

var identifiers = [new Node.BaseNode(229, 77, Color.blueGrey), new Node.BaseNode(934, 392, Color.yellow)];
var expId = [new Node.BaseNode(853, 213, Color.blueGrey), new Node.BaseNode(568, 423, "#d7d7d6"), new Node.BaseNode(677, 570, Color.orange)];

module.exports = {
  // 页面判断
  main: new Node.ViewNode(identifiers, 0, 0, true, 10000),
  // 15 分钟选项
  option15: new Node.ViewNode(identifiers.concat([new Node.BaseNode(947, 394, Color.yellow)]), 977, 325, true, 5000),
  // 进入按钮
  go: new Node.BaseNode(1036, 705, Color.orange),
  // 返回按钮
  back: new Node.BaseNode(42, 85, Color.blueGrey),
  // 选择难度，-1～2
  choose: function (hardLevel) {
    var deltaY = 665 - 198 * hardLevel;
    //swipe(155 * 2, 665 * 2, 155 * 2, newDelta * 2, 1000);
    Action.swipe(155, 665, 155, deltaY, 1000);
  },
  // 确认窗口
  confirmWindow: new Node.ViewNode([new Node.BaseNode(821, 437, Color.yellow), new Node.BaseNode(545, 675, Color.blue), new Node.BaseNode(862, 680, Color.orange)], 0, 0, true),
  // 确认
  confirm: new Node.BaseNode(862, 680, Color.orange),
  // 取消
  cancel: new Node.BaseNode(545, 675, Color.blue),
  // 战斗窗口
  fightWindow: new Node.ViewNode([new Node.BaseNode(159, 370, "#59b0a8"), new Node.BaseNode(1169, 31, Color.white)], 0, 0, true, 20000),
  // 自动战斗
  autoFight: new Node.BaseNode(375, 745, Color.white),
  // 自动战斗窗口
  autoFightWindow: new Node.ViewNode([new Node.BaseNode(525, 257, Color.yellow), new Node.BaseNode(646, 374, Color.yellow), new Node.BaseNode(550, 606, Color.orange)], 0, 0, true, 5000),
  // 获取免费2小时时长
  autoFightGetTime: new Node.BaseNode(895, 444, Color.orange),
  // 开始自动战斗
  autoFightStart: new Node.BaseNode(707, 616, Color.orange),
  // 经验奖励窗口
  bonusWindow: new Node.ViewNode(expId, 0, 0, true),
  // 确认领取经验
  bonusConfirm: new Node.BaseNode(636, 573),
  // 继续游戏窗口
  continueWindow: new Node.ViewNode([new Node.BaseNode(515, 192, Color.orange), new Node.BaseNode(474, 676, Color.blue), new Node.BaseNode(718, 682, Color.teal)], 0, 0, true),
  // 继续窗口中的继续
  continueMenu: new Node.BaseNode(718, 682, Color.teal),
  exec: function (player) {
    var level = 0;
    if (player.level >= 140) {
      level = 2;
    }
    while (1) {
      this.main.wait();
      if (!this.option15.checkClick()) {
        break;
      }
      this.choose(level);
      level = level - 1;
      this.go.click();
      this.confirmWindow.wait();
      this.confirm.click();

      this.fightWindow.wait();
      this.autoFight.click();

      this.autoFightWindow.wait();
      this.autoFightGetTime.click();
      this.autoFightStart.click();

      this.bonusWindow.wait();
      this.bonusConfirm.click();

      this.continueWindow.wait();
      this.continueMenu.click();

      if (player.level >= 140) {
        if (level === -1) {
          break;
        }
      } else {
        if (level === 0) {
          break;
        }
      }
    }
    sleep(3000);
    this.back.click();
  },
};
