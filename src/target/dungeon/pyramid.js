var Node = require("../../node/node");
var Color = require("../../color");

// 奈特金字塔
var identifier = [
  // 背景白色
  new Node.BaseNode(158, 689, Color.lightWhite),
  // 等候室按钮
  new Node.BaseNode(919, 703, Color.blue),
];

var settleIdentifier = [new Node.BaseNode(497, 630, Color.blue), new Node.BaseNode(706, 630, Color.teal)];

module.exports = {
  // 主窗口
  mainWindow: new Node.ViewNode(identifier, 0, 0, true, 10000),
  // 返回
  back: new Node.BaseNode(43, 73),
  // 困难级别
  normalLevel: new Node.BaseNode(104, 176),
  hardLevel: new Node.BaseNode(99, 245),
  chaosLevel: new Node.BaseNode(98, 316),
  hellLevel: new Node.BaseNode(98, 385),
  pickLevel: function (level) {
    if (level < 60) {
      return false;
    }
    if (level < 80) {
      this.normalLevel.click();
      return true;
    }
    if (level < 100) {
      this.hardLevel.click();
      return true;
    }
    if (level < 140) {
      this.chaosLevel.click();
      return true;
    }
    this.hellLevel.click();
    return true;
  },
  // 进入
  go: new Node.BaseNode(1123, 703),
  // 结算窗口
  settlementWindow: new Node.ViewNode(settleIdentifier, 0, 0, true),
  // 结算窗口返回到主窗口
  backToMainWindow: new Node.BaseNode(645, 629),

  exec: function (player, times) {
    var _times = times || 100;
    while (_times) {
      if (!this.mainWindow.wait()) {
        break;
      }

      if (!this.pickLevel(player.level)) {
        break;
      }

      this.go.click();

      sleep(5000);
      if (this.mainWindow.check()) {
        break;
      }

      this.settlementWindow.wait();
      this.backToMainWindow.click();

      _times -= 1;
    }

    this.back.click();
  },
};
