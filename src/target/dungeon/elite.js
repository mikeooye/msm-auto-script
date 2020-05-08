var Node = require("../../node/node");
var Color = require("../../color");

// 精英副本
var identifier = [
  // 窗口蓝灰色标题栏
  new Node.BaseNode(409, 83, Color.blueGrey),
  // 右下角蓝色按钮
  new Node.BaseNode(755, 702, Color.blue),
];

var homeIdentifier = [new Node.BaseNode(199, 209, Color.orange), new Node.BaseNode(124, 269, "#59b0a8")];

var settleIdentifier = [new Node.BaseNode(562, 485, Color.orange), new Node.BaseNode(497, 621, Color.blue)];

module.exports = {
  // 主窗口
  mainWindow: new Node.ViewNode(identifier, 0, 0, true, 10000),
  // 返回
  back: new Node.BaseNode(43, 73),
  // 困难级别
  hardLevel: new Node.BaseNode(103, 379),
  // 进入等待房间按钮
  waitHome: new Node.BaseNode(827, 699),
  // 等候房间
  homeWindow: new Node.ViewNode(homeIdentifier, 0, 0, true, 10000),
  // 进入
  go: new Node.BaseNode(161, 206),
  // 结算窗口
  settlementWindow: new Node.ViewNode(settleIdentifier, 0, 0, true),
  // 结算窗口返回到主窗口
  backToMainWindow: new Node.BaseNode(634, 622),

  exec: function (player, times) {
    var _times = times || 100;
    while (_times) {
      if (!this.mainWindow.wait()) {
        break;
      }

      if (player.elitePoint) {
        player.elitePoint.click();
      }
      this.hardLevel.click();
      this.waitHome.click();

      if (!this.homeWindow.wait()) {
        break;
      }

      this.go.click();

      this.settlementWindow.wait();
      this.backToMainWindow.click();
      _times -= 1;
    }

    this.back.click();
  },
};
